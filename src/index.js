import dotenv from "dotenv";
dotenv.config();
import { google } from "googleapis";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import axios from "axios";
import stream from "stream";

const app = express();
app.use(cookieParser());

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;
const FolderName = process.env.FOLDER_NAME;

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Set up the Google Drive API
const drive = google.drive({ version: "v3", auth: oauth2Client });

// Serve HTML and CSS files
app.use(express.static("public"));

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// check if creds are present in a text file
// load them otherwise do nothing
app.use((req, res, next) => {
  const oauthTokensCookie = req.cookies.oauthTokens;

  if (oauthTokensCookie) {
    try {
      const tokens = JSON.parse(oauthTokensCookie);
      oauth2Client.setCredentials(tokens);
    } catch (err) {
      console.error("Error parsing OAuth tokens from cookie", err);
    }
  }
  next();
});

// this code is replaced by { app.use(express.static("public")); }
// Serve the HTML file
// app.get("/", (req, res) => {
//   try {
//     const creds = fs.readFileSync("creds.json");
//     oauth2Client.setCredentials(JSON.parse(creds));
//     res.sendFile(__dirname + "public/backend/");
//   } catch (err) {
//     console.log("no creds found");
//     res.sendFile(__dirname + "/public/backend/auth-sign-in.html");
//   }
//   res.send
// });

//auth page
app.get("/auth/google", (req, res) => {
  // generate the url that will be used to redirect
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/calendar.readonly",
    ],
  });
  res.redirect(url);
});

app.get("/google/redirect", async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);

    // Store tokens in a cookie named 'oauthTokens'
    res.cookie("oauthTokens", JSON.stringify(tokens), {
      maxAge: process.env.COOKIE_EXPIRE, // Set an expiration time if needed (in milliseconds)
      httpOnly: true, // Make the cookie accessible only on the server side
      secure: process.env.NODE_ENV === "production", // Set secure flag based on the environment
    });

    //console.log({ tokens });
    res.redirect("/backend/");
  } catch (err) {
    console.error("Error making request", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/google/calendar", async (req, res) => {
  try {
    // Check if 'oauthTokens' cookie exists in the request
    const oauthTokensCookie = req.cookies.oauthTokens;

    if (!oauthTokensCookie) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const tokens = JSON.parse(oauthTokensCookie);

    // Set OAuth credentials
    oauth2Client.setCredentials(tokens);

    // Example: Fetch upcoming events
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    calendar.events.list(
      {
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      },
      (err, response) => {
        if (err) {
          console.error("Error fetching events:", err);
          return res.status(500).json({ error: "Error fetching events" + err });
        }

        const events = response.data.items || [];
        res.json({ events });
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getUserProfile", async (req, res) => {
  try {
    // Check if 'oauthTokens' cookie exists in the request
    const oauthTokensCookie = req.cookies.oauthTokens;

    if (!oauthTokensCookie) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const tokens = JSON.parse(oauthTokensCookie);

    // Set OAuth credentials
    oauth2Client.setCredentials(tokens);

    // Create a Google People API instance
    const peopleApi = google.people({ version: "v1", auth: oauth2Client });

    // Get user profile information
    const userInfo = await peopleApi.people.get({
      resourceName: "people/me",
      personFields: "names,photos",
    });

    // Extract user's name and profile photo
    const userName = userInfo.data.names[0].displayName;
    const userPhotoUrl = userInfo.data.photos[0].url;

    res.json({ name: userName, photoUrl: userPhotoUrl });
  } catch (err) {
    console.error("Error getting user profile", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/saveText/:sometext", async (req, res) => {
  const sometext = req.params.sometext;

  try {
    const folderName = FolderName;
    const fileName = "test.txt";

    const folderId = await createFolder();

    // Upload the file to the folder
    const response = drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
        mimeType: "text/plain",
      },
      media: {
        mimeType: "text/plain",
        body: sometext,
      },
    });

    console.log(
      "File created successfully in folder:",
      folderName,
      response.data
    );
    res.json({ message: "Success" });
  } catch (error) {
    console.error("Error creating file:", error);
    res.status(500).redirect("/backend/pages-error-500.html");
  }
});

// Fetch data from Google Drive
app.get("/getData", async (req, res) => {
  try {
    // Search for the folder by name
    const folderName = FolderName;
    const folderResponse = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
      fields: "files(id, name)",
    });

    const folder = folderResponse.data.files[0];

    if (folder) {
      // Use the obtained folder ID to fetch data from the folder
      const folderId = folder.id;
      const response = await drive.files.list({
        mimeType: "text/plain",
        q: `'${folderId}' in parents`,
        fields: "files(id, name)",
      });

      const files = response.data.files;

      if (files && files.length) {
        // Process the list of files
        files.forEach((file) => {
          console.log("File Name:", file.name);
          console.log("File ID:", file.id);
          console.log("---");
        });
        res.json(files);
      } else {
        console.log("No files found in the folder.");
        res.json([]);
      }
    } else {
      console.log("Folder not found.");
      res.json([]);
    }
  } catch (error) {
    res.status(500).send("you are not sign in ");
    console.error("Error fetching data from Google Drive:", error.message);
  }
});

app.get("/getData/:fileId", async (req, res) => {
  const fileId = req.params.fileId;

  try {
    const fileContent = await drive.files.get({ fileId, alt: "media" });
    const data = fileContent.data;

    res.json({ content: data });
  } catch (error) {
    console.error("Error reading data from Google Drive:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function createFolder() {
  const folderName = FolderName;

  // Check if the folder exists
  const folderResponse = await drive.files.list({
    q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder'`,
    fields: "files(id)",
  });

  let folderId;

  if (folderResponse.data.files.length > 0) {
    // Folder exists, use its ID
    folderId = folderResponse.data.files[0].id;
  } else {
    // Folder doesn't exist, create it
    const createFolderResponse = await drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
      },
      fields: "id",
    });

    folderId = createFolderResponse.data.id;
  }
  return folderId;
}

async function createFile(fileName, data) {
  try {
    const folderId = await createFolder();
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
        mimeType: "application/json",
      },
      media: {
        mimeType: "application/json",
        body: JSON.stringify(data),
      },
    });
    console.log("File created successfully:", response.data);
  } catch (error) {
    console.error("Error creating file:", error.message);
  }
}

//task dir
app.post("/add-task", async (req, res) => {
  const newTaskData = req.body;
  const folderName = FolderName;
  const fileName = "tasks.json";

  try {
    // const folderId = await createFolder();
    // Upload the file to the folder
    console.log(newTaskData);
    await createFile(fileName, newTaskData);

    console.log("File created successfully in folder:", folderName);
    res.json({ message: "Success" });
  } catch (error) {
    console.error("Error creating file:", error);
    res.status(500).send("Internal Server Error");
  }
});

// API endpoint to get task data
app.get("/task-data", async (req, res) => {
  try {
    // Search for the folder by name
    const folderName = FolderName;
    const folderResponse = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
      fields: "files(id, name)",
    });
    const folder = folderResponse.data.files[0];

    if (folder) {
      // Use the obtained folder ID to fetch data from the folder
      const folderId = folder.id;
      const response = await drive.files.list({
        mimeType: "text/plain",
        q: `'${folderId}' in parents`,
        fields: "files(id, name)",
      });

      const files = response.data.files;

      if (files && files.length) {
        res.json(files);
      } else {
        console.log("No files found in the folder.");
        res.json([]);
      }
    } else {
      console.log("Folder not found.");
      res.json([]);
    }
  } catch (error) {
    res.status(500).redirect("/backend/pages-error-500.html");
    console.error("Error fetching data from Google Drive:", error.message);
  }
});

app.get("/task-data/:fileId", async (req, res) => {
  const fileId = req.params.fileId;

  try {
    const fileContent = await drive.files.get({ fileId, alt: "media" });
    const data = fileContent.data;

    res.json(data);
  } catch (error) {
    console.error("Error reading data from Google Drive:", error);
    res.status(500).redirect("/backend/pages-error-500.html");
  }
});

//employee dir
app.post("/add-employee", async (req, res) => {
  const newTaskData = req.body;
  const folderName = FolderName;
  const fileName = "employee.json";

  try {
    // const folderId = await createFolder();
    // Upload the file to the folder
    console.log(newTaskData);
    await createFile(fileName, newTaskData);

    console.log("File created successfully in folder:", folderName);
    res.json({ message: "Success" });
  } catch (error) {
    console.error("Error creating file:", error);
    res.status(500).send("Internal Server Error");
  }
});

// API endpoint to get task data
app.get("/employee-data", async (req, res) => {
  try {
    // Search for the folder by name
    const folderName = FolderName;
    const folderResponse = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
      fields: "files(id, name)",
    });
    const folder = folderResponse.data.files[0];

    if (folder) {
      // Use the obtained folder ID to fetch data from the folder
      const folderId = folder.id;
      const response = await drive.files.list({
        mimeType: "text/plain",
        q: `'${folderId}' in parents`,
        fields: "files(id, name)",
      });

      const files = response.data.files;

      if (files && files.length) {
        res.json(files);
      } else {
        console.log("No files found in the folder.");
        res.json([]);
      }
    } else {
      console.log("Folder not found.");
      res.json([]);
    }
  } catch (error) {
    res.status(500).redirect("/backend/pages-error-500.html");
    console.error("Error fetching data from Google Drive:", error.message);
  }
});

app.get("/employee-data/:fileId", async (req, res) => {
  const fileId = req.params.fileId;

  try {
    const fileContent = await drive.files.get({ fileId, alt: "media" });
    const data = fileContent.data;

    res.json(data);
  } catch (error) {
    console.error("Error reading data from Google Drive:", error);
    res.status(500).redirect("/backend/pages-error-500.html");
  }
});

app.post("/updateFile/:fileId", async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const content = req.body.content;

    const buf = Buffer.from(content, "binary");
    const buffer = Uint8Array.from(buf);
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);

    const media = {
      mimeType: "application/vnd.google-apps.document",
      body: bufferStream,
    };

    const response = await drive.files.update({
      fileId: fileId,
      media: media,
    });

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/delete-file/:fileId", async (req, res) => {
  // Check if 'oauthTokens' cookie exists in the request
  const oauthTokensCookie = req.cookies.oauthTokens;

  if (!oauthTokensCookie) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const tokens = JSON.parse(oauthTokensCookie);

  // Set existing OAuth credentials
  oauth2Client.setCredentials(tokens);

  const fileId = req.params.fileId;

  const deleteFile = async () => {
    try {
      const response = await axios.delete(
        `https://www.googleapis.com/drive/v2/files/${fileId}`,
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        }
      );

      console.log("File deleted successfully:", response.data);
      res
        .status(200)
        .json({ success: true, message: "File deleted successfully" });
    } catch (error) {
      console.error(
        "Error deleting file:",
        error.response ? error.response.data : error.message
      );
      res.status(500).json({ success: false, message: "Error deleting file" });
    }
  };

  deleteFile();
});

app.get("/signinStatus", async (req, res) => {
  try {
    const oauthTokensCookie = req.cookies.oauthTokens;

    if (oauthTokensCookie) {
      const tokens = JSON.parse(oauthTokensCookie);
      oauth2Client.setCredentials(tokens);
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }
  } catch (err) {
    console.error(
      "Error setting credentials or parsing OAuth tokens from cookie",
      err
    );
    res.json({ status: false });
  }
});

app.get("/signout", (req, res) => {
  try {
    // Delete the 'oauthTokens' cookie
    res.clearCookie("oauthTokens");

    // Optionally, you can also remove any existing 'creds.json' file
    // if (fs.existsSync("creds.json")) fs.unlinkSync("creds.json");

    // Redirect or respond as needed
    res.redirect("/");
  } catch (error) {
    console.error("Error during sign-out:", error);
    res.status(500).redirect("/backend/pages-error-500.html");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on  http://${HOST}:${PORT}`);
});
