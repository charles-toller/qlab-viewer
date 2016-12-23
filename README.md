# qlab-viewer
This connects to a running QLab instance and generates a printout for the workspace, similar to Josh Langman's [PDF speciman](https://postwiki.s3.amazonaws.com/files/asset/attachment/376/QLab_3_Icons_font_specimen.pdf).

Usage
=====
Make sure you have Node.js (at least version 6) and npm installed, and then run `npm install` and `npm start`. Navigate to http://localhost:3000
and enter the IP address of the workspace (if local, 127.0.0.1) and click "Find Workspaces". Choose your workspace and click render. Be patient,
as this may take a few seconds to fetch all the cues and render them. Then, print it out and enjoy!
