![image](https://github.com/user-attachments/assets/744fa6ad-e3cd-4afc-9ef6-7e62c70c8697)Binary Search Tree (BST), Red-Black Tree (RBT), and AVL Tree Visualizer
A simple and interactive visualizer that demonstrates the inner workings of three different types of binary trees: Binary Search Tree (BST), Red-Black Tree (RBT), and AVL Tree. This web application lets you visualize the insertion, deletion, search, and rotation operations, with animations and real-time feedback.

Features
Insert Node: Insert a node with a specified value into the tree.
Search Node: Search for a node by its value. The search path is visually highlighted, and the found node will be highlighted in green.
Delete Node: Delete a node (currently only supports basic functionality).
Clear Tree: Clears the entire tree.
Rotation Animations: Visualizes rotations with animations (for AVL and Red-Black Trees).
Responsive Design: Automatically resizes the canvas to fit the screen.
Selectable Tree Type: Switch between BST, RBT, and AVL Trees to see how each structure behaves.
Files Overview
index.html: Contains the HTML structure of the page, including input fields for interacting with the tree, buttons for tree operations, and the canvas where the tree is visualized.
style.css: Styles the page, buttons, inputs, and canvas. Uses flexbox for layout and gives the controls a clean, modern look.
bstTree.js: JavaScript code that implements the Binary Search Tree with animations for insertion, deletion, and search.
rbtTree.js: JavaScript code for the Red-Black Tree implementation. Includes additional operations for fixing tree properties after insertion (color flips, rotations).
avlTree.js: JavaScript code for the AVL Tree implementation. Includes balancing logic and rotations after insertions and deletions.
How to Run the Project
Clone or Download the Project:

If you're using Git, you can clone the repository:
bash
Copy
Edit
git clone https://github.com/your-username/tree-visualizer.git
Alternatively, download the project as a ZIP file and extract it.
Open the Project in Your Browser:

Open the index.html file in any modern web browser (e.g., Chrome, Firefox, Safari).
The tree visualizer will load, and you can start interacting with it by inserting nodes and performing searches.
Using the Visualizer:

Insert a Node: Enter a node value in the input box and press Enter or click the Insert button.
Search a Node: Enter a node value and click the Search button. The search path will light up, showing the path to the found node in green.
Delete a Node: Enter a node value and click the Delete button. The node will be deleted from the tree (basic delete functionality is in place).
Clear the Tree: Click the Clear Tree button to reset the entire tree.
Select Tree Type: Use the dropdown to choose the tree type you want to visualize (BST, RBT, or AVL).
Folder Structure
graphql
Copy
Edit
Binary-Search-Tree/
│
├── docs/
│   ├── AVL-tree/
│   │   ├── AVL.css
│   │   ├── AVL.html
│   │   └── AVL.js
│   │
│   ├── BST/
│   │   ├── BST.css
│   │   ├── BST.html
│   │   └── BST.js
│   │
│   └── Red-Black-Tree/
│       ├── RBT.css
│       ├── RBT.html
│       └── RBT.js
│
├── img/
│   └── binary-tree-composition-icon-round.png
│
├── index.html
├── script.js
└── style.css
     
How It Works
1. Binary Search Tree (BST) JavaScript Implementation (bstTree.js)
Node Class: Each node stores its value, color (for visualization), and pointers to left, right, and parent nodes.
BST Class: Manages the root of the tree, insertion, search, and deletion operations. It also handles the drawing of the tree on the HTML canvas.
Animations: Every operation (insert, search, delete) is accompanied by smooth animations for a better visual experience.
Canvas Drawing: The tree is visualized using a <canvas> element. Each node is drawn as a circle with its value in the center.
2. Red-Black Tree (RBT) JavaScript Implementation (rbtTree.js)
Red-Black Tree Properties: The RBT has specific properties, such as:
Every node is either red or black.
The root is always black.
Red nodes cannot have red children (no two red nodes can be adjacent).
Every path from a node to its descendant leaves has the same number of black nodes.
Fixing Violations: After insertion, color flips and rotations are used to maintain these properties.
Animations: The insertion, search, and rotation operations are visualized with animations.
3. AVL Tree JavaScript Implementation (avlTree.js)
AVL Tree Properties: The AVL Tree is a self-balancing Binary Search Tree where the height difference between the left and right subtrees of any node is at most 1.
Balancing: After every insertion and deletion, rotations (left, right, and double rotations) are used to keep the tree balanced.
Animations: Rotations and tree adjustments are visualized with smooth animations.
4. CSS Styling (style.css)
Styles the tree visualizer page with a modern layout, including a responsive canvas and styled buttons.
Uses flexbox to align the controls on the left and the tree canvas on the right.
Buttons have hover effects, and the input field is large enough for easy interaction.
5. HTML Structure (index.html)
Contains a simple layout with an input field for entering node values, a dropdown for selecting the tree type (BST, RBT, or AVL), and buttons for tree operations.
The canvas is where the tree is visualized, and it's responsive to fit the screen size.
Contributing
Feel free to fork this repository and make your own contributions! Here are some ideas for improvements:

Implement more advanced tree operations, like balancing or AVL trees.
Enhance the delete functionality to handle more cases.
Add color themes or customizations for the user interface.
License
This project is open-source and available under the MIT License.

