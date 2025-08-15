const profileInfo = {
  name: "A027",
  degree: "B.Tech in CSE",
  links: {
    // No need to fill GitHub
    github: "https://github.com/avinash-027",
    linkedin: "https://linkedin.com/in/avinash-chinimilli-027x"
  },
  images: ["./assets/img01.jpg", "./assets/img02.jpg", "./assets/img03.jpg", "./assets/img04.jpg", "./assets/img05.jpeg",
  ],
};

const skills = {
  webDevelopment: [
    "HTML",
    "CSS",
    "JavaScript",
    "Pico CSS",
    "ASP.NET MVC",
    "ASP.NET Web API",
    "Entity Framework Core",
    "C#",
    "React.js",
  ],
  frameworksAndTechnologies: [".NET"],
  programmingLanguages: ["Python"],
  versionControl: ["Git", "GitHub"],
  databaseTechnologies: ["SQL"],
}

// Initial Local Projects
const projects = [
  {
    gitTitle: "airline-fare-prediction",
    name: "Airline Fare Prediction Using Machine Learning",
    description:
      "This project utilizes machine learning algorithms to forecast airline ticket prices, considering factors such as flight schedules, destinations, and seasonality. The models employed include K-Nearest Neighbors (KNN), Linear Regression, and Random Forest. Additionally, the project features a Django-based platform that allows users to input flight details and receive fare predictions. Future enhancements aim to improve the accuracy of the predictions and the overall user experience.",
    tools: ["Python", "Django", "Machine Learning"],
    link: "https://github.com/avinash-027/airline-fare-prediction",
    faIcon: "fa-plane-departure",
  },
  {
    gitTitle: "",
    name: "Sentiment Analysis of Product-Based Reviews using Machine Learning Approaches",
    description:
      "This project focuses on performing Sentiment Analysis of product reviews gathered from various online platforms. The main goal is to categorize each review into sentiment categories like positive, negative, or neutral. Using Python and Machine Learning techniques, the project analyzes and classifies the review data to deliver accurate and insightful sentiment predictions.",
    tools: ["Python", "FlaskAPI", "Machine Learning"],
    link: "",
    faIcon: "fa-chart-simple",
  },
  {
    gitTitle: "t-rex-game",
    name: "T-Rex Game",
    description:
      "The T-Rex Game is a simple browser-based game inspired by the offline Dino game in Google Chrome, where you control a dinosaur to jump over cactus obstacles. The goal is to avoid collisions and achieve the highest score possible. The game ends when you hit an obstacle, and you can restart it by clicking the 'RE-START' button. It's a fun way to pass the time and challenge yourself to beat your previous high scores.",
    tools: ["HTML", "CSS", "JavaScript", "LocalStorage (for saving tasks)"],
    link: "https://github.com/avinash-027/t-rex-game",
    faIcon: "fa-gamepad",
  },
  {
    gitTitle: "ToDo-List-App",
    name: "To-Do List App",
    description:
      "The To-Do List App allows users to manage their tasks efficiently by adding, updating, and deleting them. The app helps you stay organized by providing an easy way to track your daily tasks and check off completed ones. It offers a simple, user-friendly interface for task management, making it perfect for personal use or small team collaboration.",
    tools: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    link: "https://github.com/avinash-027/ToDo-List-App",
    faIcon: "fa-list-ul",
  },
  {
    gitTitle: "",
    name: "Data Extraction Using Web Scraping",
    description:
      "Executed a web scraping project using BeautifulSoup, Tkinter, Requests to extract valuable data from a book store website. The objective of the project is to extract relevant data from book store website, enhancing data retrieval and user interaction capabilities.",
    tools: ["Python", "tKinter", "Beautiful Soup", "request"],
    link: "",
    faIcon: "fa-database",
  },
];

// Two default icons (will apply if faIcon not set)
const defaultFaIcons = ["fa-code", "fa-folder-open"];

async function fetchGitHub() {
  try {
    // Fetch repos with topics
    const reposResponse = await fetch("https://api.github.com/users/avinash-027/repos", {
      headers: {
        "Accept": "application/vnd.github+json",
      },
    });
    const repos = await reposResponse.json();

    repos.forEach((repo, index) => {
      const exists = projects.some(p => p.gitTitle === repo.name);
      if (!exists) {
        projects.push({
          gitTitle: repo.name,
          name: repo.name.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
          description: repo.description || "No description available.",
          tools: repo.topics && repo.topics.length > 0 ? repo.topics : ["General"],
          link: repo.html_url,
          faIcon: defaultFaIcons[index % defaultFaIcons.length],
        });
      }
    });

    console.log("✅ All gOOd");
  } catch (err) {
    console.error("❌ Error fetching GitHub data:", err);
  }
}

const quotes = [
  "Nothing ever goes as planned.",
  "Just do it.",
  "Never too late to start over…",
  "The trouble is, you think you have time.",
  "It's about the journey, not the destination.",
  "The deeper meaning will become evident once you read the book a hundred times.",
  "Nothing ever lasts forever.",
  "They say the world changes when you change, but that's not true.",
  "I just ask myself why I don't have it, and disappoint myself. I think that's why I wanted something different.",
  "Participation matters more than winning; even not experiencing what others do has value and is sometimes necessary.",
  "Nobody actually wants any real change.",
  "You know it, they know it. You know they know it, they know you know it.",
  "There is no other side, this is it."
];

const info = {
  profileInfo,
  projects,
  skills,
  quotes
};

export { profileInfo, projects, skills, quotes, info, fetchGitHub };
