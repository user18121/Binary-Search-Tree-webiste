class Node {
    constructor(value) {
        this.value = value;
        this.height = 1;
        this.left = null;
        this.right = null;
        this.x = 0;  // Store the X coordinate for animations
        this.y = 0;  // Store the Y coordinate for animations
        this.color = 'green'; // Set the default node color to green
    }
}

class AVLTree {
    constructor() {
        this.root = null;
        this.canvas = document.getElementById('avlCanvas');
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

        root.height = Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1;

        const balance = this.getBalance(root);

        // Left-Left case
        if (balance > 1 && node.value < root.left.value) {
            return this.rotateRight(root);
        }

        // Right-Right case
        if (balance < -1 && node.value > root.right.value) {
            return this.rotateLeft(root);
        }

        // Left-Right case
        if (balance > 1 && node.value > root.left.value) {
            root.left = this.rotateLeft(root.left);
            return this.rotateRight(root);
        }

        // Right-Left case
        if (balance < -1 && node.value < root.right.value) {
            root.right = this.rotateRight(root.right);
            return this.rotateLeft(root);
        }

        return root;
    }

    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

        this.animateNode(x, x.x - 100, x.y + 100);  // Animation for x
        this.animateNode(y, y.x, y.y);  // Animation for y

        return y;
    }

    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        this.animateNode(y, y.x + 100, y.y + 100);  // Animation for y
        this.animateNode(x, x.x, x.y);  // Animation for x

        return x;
    }

    getHeight(node) {
        if (!node) return 0;
        return node.height;
    }

    getBalance(node) {
        if (!node) return 0;
        return this.getHeight(node.left) - this.getHeight(node.right);
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
                node.color = 'cyan'; // Highlight the path node

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

    // Draw the AVL tree on the canvas
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

const tree = new AVLTree();

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
