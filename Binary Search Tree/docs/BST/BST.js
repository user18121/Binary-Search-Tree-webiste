class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = 0;  // Store the X coordinate for animations
        this.y = 0;  // Store the Y coordinate for animations
        this.color = 'green'; // Set the default node color to green
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
        this.canvas = document.getElementById('bstCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth - 20;
        this.canvas.height = window.innerHeight - 100;
    }

    // Insert a node
    insert(value) {
        const newNode = new Node(value);
        this.root = this.insertNode(this.root, newNode);
        this.drawTree();
    }

    insertNode(root, node) {
        if (!root) return node;

        if (node.value < root.value) {
            root.left = this.insertNode(root.left, node);
        } else if (node.value > root.value) {
            root.right = this.insertNode(root.right, node);
        }

        return root;
    }

    // Search for a node
    search(value) {
        const path = [];
        const node = this.searchNode(this.root, value, path);
        if (node) {
            this.animateSearch(path);
        }
    }

    searchNode(node, value, path) {
        if (!node) return null;

        path.push(node);

        if (value === node.value) {
            return node;
        } else if (value < node.value) {
            return this.searchNode(node.left, value, path);
        } else {
            return this.searchNode(node.right, value, path);
        }
    }

    animateSearch(path) {
        let index = 0;

        const highlightNextNode = () => {
            if (index < path.length) {
                const node = path[index];
                const originalColor = node.color;
                node.color = 'yellow'; // Highlight the path node

                // If it is the target node, color it green
                if (index === path.length - 1) {
                    node.color = 'blue';
                }

                this.drawTree();

                setTimeout(() => {
                    node.color = originalColor;
                    this.drawTree();
                    index++;
                    highlightNextNode();
                }, 500);
            }
        };

        highlightNextNode();
    }

    // Draw the Binary Search Tree on the canvas
    drawTree() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.root) {
            this.drawNode(this.root, this.canvas.width / 2, 50, 150);
        }
    }

    // Draw a node and its children
    drawNode(node, x, y, offset) {
        if (!node) return;

        const radius = 30;
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        this.ctx.fillStyle = node.color; // Use the node's color
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(node.value, x, y);

        if (node.left) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x - offset, y + 50);
            this.ctx.stroke();
            this.drawNode(node.left, x - offset, y + 50, offset / 2);
        }

        if (node.right) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + offset, y + 50);
            this.ctx.stroke();
            this.drawNode(node.right, x + offset, y + 50, offset / 2);
        }
    }

    // Animate the node's movement during rotations
    animateNode(node, targetX, targetY) {
        const dx = (targetX - node.x) * 0.1;
        const dy = (targetY - node.y) * 0.1;

        const animate = () => {
            node.x += dx;
            node.y += dy;

            if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                requestAnimationFrame(animate);
            } else {
                node.x = targetX;
                node.y = targetY;
            }
            this.drawTree();
        };

        animate();
    }
}

const tree = new BinarySearchTree();

document.getElementById('insertButton').addEventListener('click', () => {
    const value = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(value)) {
        tree.insert(value);
    }
});

document.getElementById('deleteButton').addEventListener('click', () => {
    const value = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(value)) {
        tree.delete(value);
    }
});

document.getElementById('searchButton').addEventListener('click', () => {
    const value = parseInt(document.getElementById('nodeValue').value);
    if (!isNaN(value)) {
        tree.search(value);
    }
});

document.getElementById('clearButton').addEventListener('click', () => {
    tree.root = null;
    tree.drawTree();
    document.getElementById('status').textContent = 'Tree cleared.';
});

// Add event listener for the Enter key
document.getElementById('nodeValue').addEventListener('keydown', (event) => {
    const value = parseInt(event.target.value);
    if (event.key === 'Enter' && !isNaN(value)) {
        if (document.activeElement === document.getElementById('nodeValue')) {
            tree.insert(value); // Insert node on Enter
        }
    }
});
