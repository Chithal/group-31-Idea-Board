# this is the prompt for the studnt toolkit


"Please act as a front-end web developer and help me build a student dashboard using HTML, CSS, and vanilla JavaScript. The design should be responsive and follow the specific requirements below:

1. Layout Structure:

Navigation Bar: Include a logo placeholder for 'UCSC', a menu with 'GPA Calculator' and 'Study Timer', and a Dark Mode toggle switch. Use the class name navbar.

Sidebar: Include a section titled 'Upcoming Events' with the class sidebar.

Theme: Use a professional color scheme inspired by UCSC branding: Maroon (#800000) and Gold (#FFD700).

2. Interactive Features:

GPA Calculator: Create an input section where the user can enter course credits and grades. Add a 'Calculate' button that computes and displays the overall GPA on the screen.

Pomodoro Timer: Implement a 25-minute countdown timer with 'Start' and 'Reset' buttons. Include a simple browser alert or a console log notification for when the timer reaches zero.

Dark Mode: Write a JavaScript function to toggle a CSS class that switches the interface between a light mode (white/light grey) and a dark mode (dark grey/black).

3. Styling & Polish:

Animations: Use CSS keyframes to add a smooth fade-in effect for the main sections when the page loads.

Sidebar Interactivity: Style the 'Upcoming Events' items so that when the user hovers over them, they glow and expand slightly using CSS transitions and :hover pseudo-classes.

Please provide the code in three separate, clean blocks: index.html, style.css, and script.js. Ensure the code is well-commented so I can understand how the logic works."


#json prompt


{
  "task": "Develop a responsive student dashboard web application.",
  "technologies": ["HTML5", "CSS3", "Vanilla JavaScript"],
  "branding": {
    "primary_color": "#800000 (Maroon)",
    "secondary_color": "#FFD700 (Gold)"
  },
  "layout_structure": {
    "navbar": {
      "class": "navbar",
      "elements": ["UCSC Logo Placeholder", "GPA Calculator link", "Study Timer link", "Dark Mode Toggle Switch"]
    },
    "sidebar": {
      "class": "sidebar",
      "title": "Upcoming Events",
      "interaction": "On hover: items must glow and expand slightly"
    }
  },
  "functionality": {
    "gpa_calculator": {
      "inputs": ["Course Credits", "Grades"],
      "action": "Calculate button to compute and display GPA"
    },
    "pomodoro_timer": {
      "duration": "25 minutes",
      "controls": ["Start", "Reset"],
      "notification": "Bell sound or browser alert upon zero"
    },
    "dark_mode": {
      "function": "Toggle body/container classes between light (white/grey) and dark (dark grey/black)"
    }
  },
  "design_requirements": {
    "animations": "Implement smooth fade-in effects on page load for all sections.",
    "code_delivery": "Provide three separate, well-commented blocks: index.html, style.css, and script.js."
  }
}