export interface Publication {
  id: string;
  title: string;
  authors: string[];
  conference: string;
  year: number;
  doi?: string;
  status?: string;
  abstract?: string;
  tags?: string[];
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  period: string;
  description: string[];
  tags?: string[];
  collaboration?: string;
  image?: string;
  role?: string;
}

export const personalInfo = {
  name: "Kefan Xu",
  role: "PhD Student in Human-Centered Computing",
  school: "Georgia Institute of Technology",
  advisor: "Dr. Rosa I. Arriaga",
  location: "Atlanta, GA, U.S.",
  about: `I am a PhD student in Human-Centered Computing at Georgia Tech, advised by Dr. Rosa I. Arriaga. My research lies at the intersection of HCI, Health Informatics, and Personal Informatics. I investigate how to support individuals with chronic conditions and their caregivers through the design of novel sensing systems and reflection mechanisms.`,
  vision: {
    title: "Research Vision",
    content: [
      "My research focuses on bridging the gap between clinical requirements and the lived experiences of patients with chronic conditions. I believe that effective health technologies must be grounded in a deep understanding of users' everyday lives.",
      "I am particularly interested in how we can leverage ubiquitous computing and sensing technologies to create 'Ecological Informatics'—systems that capture and present health data in ways that are meaningful and actionable for both patients and clinicians within their specific contexts."
    ]
  },
  social: {
    github: "https://github.com/kefanxu",
    scholar: "https://scholar.google.com/citations?user=ocdZFbwAAAAJ&hl=en",
    linkedin: "", 
    email: "mailto:kefan.xu@gatech.edu"
  }
};

export const publications: Publication[] = [
  {
    id: "cscw2025",
    title: "Understanding the Temporality of Informal Caregivers' Sense-Making on Conflicts and Life-Changing Events through Online Health Communities",
    authors: ["Kefan Xu", "Cynthia M. Baseman", "Nathaniel Swinger", "Myeonghan Ryu", "Rosa I. Arriaga"],
    conference: "CSCW 2025",
    year: 2025,
    doi: "https://doi.org/10.1145/3757519",
    tags: ["Caregiving", "Online Health Communities", "Sense-Making"],
    abstract: "This study investigates how informal caregivers use online health communities to make sense of conflicts and life-changing events. Through a temporal analysis of forum posts, we uncover the evolving nature of caregiving challenges and the role of peer support in navigating complex care trajectories."
  },
  {
    id: "dis2025",
    title: "Explainable AI for Daily Scenarios from End-Users' Perspective: Non-Use, Concerns, and Ideal Design",
    authors: ["Lingqing Wang", "Chidimma Lois Anyi", "Kefan Xu", "Yifan Liu", "Rosa I. Arriaga", "Ashok K. Goel"],
    conference: "DIS 2025",
    year: 2025,
    doi: "https://doi.org/10.1145/3715336.3735796",
    tags: ["XAI", "End-Users", "Design"],
    abstract: "We explore end-users' perspectives on Explainable AI (XAI) in daily scenarios. The study highlights reasons for non-use, user concerns regarding privacy and trust, and proposes ideal design guidelines for more user-centric XAI systems."
  },
  {
    id: "chi2024",
    title: "Understanding the Effect of Reflective Iteration on Individuals' Physical Activity Planning",
    authors: ["Kefan Xu", "Xinghui Yan", "Myeonghan Ryu", "Mark W. Newman", "Rosa I. Arriaga"],
    conference: "CHI 2024",
    year: 2024,
    doi: "https://doi.org/10.1145/3613904.3641937",
    tags: ["Physical Activity", "Planning", "Reflection"],
    abstract: "This paper examines how reflective iteration impacts physical activity planning. By analyzing user behaviors, we demonstrate that iterative reflection helps individuals create more realistic and achievable physical activity plans, leading to better adherence."
  },
  {
    id: "cscw2024",
    title: "Using Sensor-Captured Patient-Generated Data to Support Clinical Decisionmaking in PTSD Therapy",
    authors: ["Hayley I. Evans", "Myeonghan Ryu", "Theresa Hsieh", "Jiawei Zhou", "Kefan Xu", "Kenneth W. Akers", "Andrew M. Sherrill", "Rosa I. Arriaga"],
    conference: "CSCW 2024",
    year: 2024,
    doi: "https://doi.org/10.1145/3637426",
    tags: ["PTSD", "Clinical Decision Support", "Sensors"],
    abstract: "We investigate the use of sensor-captured patient-generated data (PGD) in PTSD therapy. The study reveals how such data can support clinical decision-making by providing objective insights into patient progress and symptom fluctuations."
  },
  {
    id: "chi2022",
    title: "Understanding People's Experience for Physical Activity Planning and Exploring the Impact of Historical Records on Plan Creation and Execution",
    authors: ["Kefan Xu", "Xinghui Yan", "Mark W. Newman"],
    conference: "CHI 2022",
    year: 2022,
    doi: "https://doi.org/10.1145/3491102.3501997",
    tags: ["Physical Activity", "Historical Data", "Planning"],
    abstract: "This research explores how access to historical planning records influences current physical activity planning. We found that reviewing past plans and outcomes helps users identify patterns and adjust their strategies for better execution."
  }
];

export const projects: Project[] = [
  {
    id: "ducss",
    title: "Diabetes Ubiquitous Computational Sensing System (DUCSS)",
    period: "2022 - Present",
    collaboration: "Emory University & Grady Memorial Hospital",
    description: [
      "Designing user studies to uncover diabetes patients' self-management challenges.",
      "Exploring caregiving dynamics in diabetes management.",
      "Leading the creation of patient-empowering sensors and mobile technologies."
    ],
    tags: ["Health Informatics", "Diabetes", "Sensing"],
    role: "Lead Researcher"
  },
  {
    id: "sedentary",
    title: "Sense Making in Contextual Situated Sedentary Behavior Data",
    period: "2022 - Present",
    collaboration: "University of Michigan",
    description: [
      "Designing user studies aimed at unveiling diverse ways individuals make sense of physical activity data.",
      "Probing feasibility of sensors in capturing holistic information about physical activity.",
      "Refining Experience Sampling Methods."
    ],
    tags: ["Sense-Making", "Data Viz", "Activity Tracking"],
    role: "Co-Investigator"
  },
  {
    id: "ptsd",
    title: "PTSD Clinical Decision Support",
    period: "2022 - 2025",
    description: [
      "Delved into PTSD patients' practices and clinical workflows of Prolonged Exposure therapy.",
      "Designed and implemented tools for clinicians to optimize patient management.",
      "Created patient-facing tools to aid therapy and communication."
    ],
    tags: ["Mental Health", "Clinical Tools", "PTSD"],
    role: "UX Researcher & Developer"
  }
];

export const skills = {
  research: [
    "Interviews", "Co-Design", "Thematic Analysis", "Contextual Inquiry",
    "Focus Group", "Usability Evaluation", "Affinity Mapping",
    "Prototyping", "Interaction Design"
  ],
  tools: [
    "Unity", "Git", "Figma", "Adobe Creative Suite", "Tableau", "NVivo"
  ],
  languages: [
    "Python", "Java", "C++", "C#", "Swift", "HTML/CSS/JS", 
    "React Native", "R", "MySQL", "d3.js"
  ]
};
