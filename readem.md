To Run the App, use following commands :-
    In one terminal:

        cd backend
        node index.js

    In another terminal:

        cd frontend
        npm start

-- Folder Structure

hd-wallet-project/
│
├── backend/                    # Node.js backend
│   ├── index.js                # Express server with HD wallet logic
│   └── package.json            # Backend dependencies
│
├── frontend/                   # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js              # Main UI for generating wallet
│   │   └── index.js            # React entry point
│   └── package.json            # Frontend dependencies
│
├── README.md                   # Project documentation
└── .gitignore
