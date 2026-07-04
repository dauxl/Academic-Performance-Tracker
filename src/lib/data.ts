import type { Semester } from "./types";

/**
 * Grade -> Grade Point mapping on Thapar's 10-point scale.
 */
export const GRADES: Record<string, number> = {
  "A+": 10,
  "A": 10,
  "A-": 9,
  "B": 8,
  "B-": 7,
  "C": 6,
  "C-": 5,
  "E": 2,
  "F": 0
};

/**
 * Selectable grade options shown in the grade dropdown, in display order.
 */
export const GRADE_OPTS: string[] = [
  "A+",
  "A",
  "A-",
  "B",
  "B-",
  "C",
  "C-",
  "E",
  "F"
];

/**
 * Pre-populated curriculum for the CSE 2026 scheme (8 semesters).
 * This is the initial state used the first time the app runs, and
 * whenever the user hits 'Reset Data'.
 */
export const DEFAULT_SEMS: Semester[] = [
  {
    "name": "Semester 1",
    "manualSgpa": null,
    "manualCredits": null,
    "subjects": [
      {
        "code": "UES101",
        "name": "Engineering Drawing",
        "grade": "",
        "credits": 4
      },
      {
        "code": "UES102",
        "name": "Manufacturing Processes",
        "grade": "",
        "credits": 3
      },
      {
        "code": "UHU003",
        "name": "Professional Communication",
        "grade": "",
        "credits": 3
      },
      {
        "code": "UMA023",
        "name": "Differential Equations & Linear Algebra",
        "grade": "",
        "credits": 3.5
      },
      {
        "code": "UPH013",
        "name": "Physics",
        "grade": "",
        "credits": 4.5
      },
      {
        "code": "UTA032",
        "name": "Boot Camp",
        "grade": "",
        "credits": 1
      }
    ]
  },
  {
    "name": "Semester 2",
    "manualSgpa": null,
    "manualCredits": null,
    "subjects": [
      {
        "code": "UCB009",
        "name": "Chemistry",
        "grade": "",
        "credits": 4
      },
      {
        "code": "UEN008",
        "name": "Energy and Environment",
        "grade": "",
        "credits": 2
      },
      {
        "code": "UES013",
        "name": "Electrical & Electronic Engineering",
        "grade": "",
        "credits": 4.5
      },
      {
        "code": "UES103",
        "name": "Programming for Problem Solving",
        "grade": "",
        "credits": 4
      },
      {
        "code": "UMA022",
        "name": "Calculus for Engineers",
        "grade": "",
        "credits": 3.5
      }
    ]
  },
  {
    "name": "Semester 3",
    "manualSgpa": null,
    "manualCredits": null,
    "subjects": [
      {
        "code": "UCS301",
        "name": "Data Structures",
        "grade": "",
        "credits": 4
      },
      {
        "code": "UCS303",
        "name": "Operating Systems",
        "grade": "",
        "credits": 4
      },
      {
        "code": "UCS320",
        "name": "Intro to Sustainable Green Computing",
        "grade": "",
        "credits": 1
      },
      {
        "code": "UCS405",
        "name": "Discrete Mathematical Structures",
        "grade": "",
        "credits": 3.5
      },
      {
        "code": "UMA021",
        "name": "Numerical Linear Algebra",
        "grade": "",
        "credits": 4
      },
      {
        "code": "UTA016",
        "name": "Engineering Design Project-I (Mangonel)",
        "grade": "",
        "credits": 3
      },
      {
        "code": "UTA016",
        "name": "The Evolutionary Basis of Human Behaviour for Engineers",
        "grade": "",
        "credits": 1
      },
      {
        "code": "UTA018",
        "name": "Object Oriented Programming",
        "grade": "",
        "credits": 4
      }
    ]
  },
  {
    "name": "Semester 4",
    "manualSgpa": null,
    "manualCredits": null,
    "subjects": [
      {
        "code": "UCS415",
        "name": "Design and Analysis of Algorithms",
        "grade": "",
        "credits": 4
      },
      {
        "code": "UCS310",
        "name": "Database Management Systems",
        "grade": "",
        "credits": 4
      },
      {
        "code": "UCS414",
        "name": "Computer Networks",
        "grade": "",
        "credits": 4
      },
      {
        "code": "UCS321",
        "name": "AI for Engineers",
        "grade": "",
        "credits": 3
      },
      {
        "code": "UMA401",
        "name": "Probability and Statistics",
        "grade": "",
        "credits": 4
      },
      {
        "code": "UTA024",
        "name": "Engineering Design Project II",
        "grade": "",
        "credits": 3
      },
      {
        "code": "UTD003",
        "name": "Aptitude Skills Building",
        "grade": "",
        "credits": 2
      }
    ]
  },
  {
    "name": "Semester 5",
    "manualSgpa": null,
    "manualCredits": null,
    "subjects": [
      {
        "code": "UML501",
        "name": "MACHINE LEARNING",
        "grade": "",
        "credits": 4
      },
      {
        "code": "UCS420",
        "name": "Cognitive Computing",
        "grade": "",
        "credits": 4
      },
      {
        "code": "UCS553",
        "name": "ENTERPRISE WEB APPLICATION",
        "grade": "",
        "credits": 4
      },
      {
        "code": "UCS503",
        "name": "SOFTWARE ENGINEERING",
        "grade": "",
        "credits": 4
      },
      {
        "code": "UCS510",
        "name": "COMPUTER ARCHITECTURE AND ORGANIZATION",
        "grade": "",
        "credits": 3
      },
      {
        "code": "",
        "name": "ELECTIVE I",
        "grade": "",
        "credits": 3
      },
      {
        "code": "UCSXXX",
        "name": "Ethics and Risk Mitigation in AI",
        "grade": "",
        "credits": 3
      }
    ]
  },
  {
    "name": "Semester 6",
    "manualSgpa": null,
    "manualCredits": null,
    "subjects": [
      {
        "code": "UCS701",
        "name": "Theory of Computation",
        "grade": "",
        "credits": 3.5
      },
      {
        "code": "UMA035",
        "name": "Numerical Optimization",
        "grade": "",
        "credits": 4
      },
      {
        "code": "UTA025",
        "name": "Innovation and Entrepreneurship",
        "grade": "",
        "credits": 3
      },
      {
        "code": "",
        "name": "Elective II",
        "grade": "",
        "credits": 3
      },
      {
        "code": "",
        "name": "Elective III",
        "grade": "",
        "credits": 3
      },
      {
        "code": "UCS797",
        "name": "Capstone Project",
        "grade": "",
        "credits": 0
      },
      {
        "code": "",
        "name": "Generic Elective",
        "grade": "",
        "credits": 2
      },
      {
        "code": "UCSXXX",
        "name": "Domain Specific Applications for Engineering Graduates",
        "grade": "",
        "credits": 3
      }
    ]
  },
  {
    "name": "Semester 7",
    "manualSgpa": null,
    "manualCredits": null,
    "subjects": [
      {
        "code": "UCS701",
        "name": "Theory of Computation",
        "grade": "",
        "credits": 3.5
      },
      {
        "code": "UMA071",
        "name": "Optimization Techniques",
        "grade": "",
        "credits": 4
      },
      {
        "code": "UCS619",
        "name": "Quantum Computing",
        "grade": "",
        "credits": 4
      },
      {
        "code": "UTA025",
        "name": "Innovation and Entrepreneurship",
        "grade": "",
        "credits": 3
      },
      {
        "code": "",
        "name": "Elective II",
        "grade": "",
        "credits": 3
      },
      {
        "code": "",
        "name": "Elective III",
        "grade": "",
        "credits": 3
      },
      {
        "code": "UCS797",
        "name": "Capstone Project",
        "grade": "",
        "credits": 0
      },
      {
        "code": "UCSXXX",
        "name": "Domain Specific Applications for Engineering Graduates",
        "grade": "",
        "credits": 3
      }
    ]
  },
  {
    "name": "Semester 8",
    "manualSgpa": null,
    "manualCredits": null,
    "subjects": [
      {
        "code": "UCS802",
        "name": "Compiler Construction",
        "grade": "",
        "credits": 4
      },
      {
        "code": "UHU005",
        "name": "Humanities for Engineers",
        "grade": "",
        "credits": 3
      },
      {
        "code": "UCS714",
        "name": "Agentic AI",
        "grade": "",
        "credits": 3
      },
      {
        "code": "",
        "name": "Elective IV",
        "grade": "",
        "credits": 3
      },
      {
        "code": "UCS797",
        "name": "Capstone Project",
        "grade": "",
        "credits": 8
      }
    ]
  }
];
