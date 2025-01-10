class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
        this.canvas = document.getElementById("bstCanvas");
        this.ctx = this.canvas.getContext("2d");
    }

    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
        this.drawTree();
    }

    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else if (newNode.value > node.value) {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    search(value) {
        this.traverseAndHighlight(this.root, value);
    }

    async traverseAndHighlight(node, value) {
        if (node === null) {
            this.drawTree();
            document.getElementById("status").textContent = `Value ${value} not found.`;
            return false;
        }

        this.drawTree(node);
        await new Promise(resolve => setTimeout(resolve, 500));

        if (value < node.value) {
            return this.traverseAndHighlight(node.left, value);
        } else if (value > node.value) {
            return this.traverseAndHighlight(node.right, value);
        } else {
            this.drawTree(node, true);
            document.getElementById("status").textContent = `Value ${value} found!`;
            return true;
        }
    }

    drawTree(highlightNode = null, found = false) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawNode(this.root, this.canvas.width / 2, 50, 100, 0, highlightNode, found);
    }

    drawNode(node, x, y, xOffset, level, highlightNode, found) {
        if (node === null) return;

        const bubbleRadius = 20;
        const fontSize = "30px";
        this.ctx.font = fontSize;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        if (highlightNode === node) {
            this.ctx.fillStyle = found ? 'yellow' : 'red';
        } else {
            this.ctx.fillStyle = 'lightblue';
        }

        this.ctx.beginPath();
        this.ctx.arc(x, y, bubbleRadius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(node.value, x, y);

        if (node.left) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x - xOffset, y + 50);
            this.ctx.stroke();
            this.drawNode(node.left, x - xOffset, y + 50, xOffset / 2, level + 1, highlightNode, found);
        }

        if (node.right) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + xOffset, y + 50);
            this.ctx.stroke();
            this.drawNode(node.right, x + xOffset, y + 50, xOffset / 2, level + 1, highlightNode, found);
        }
    }
}

const bst = new BinarySearchTree();
const status = document.getElementById("status");
const inputField = document.getElementById("nodeValue");

document.getElementById("insertButton").addEventListener("click", () => {
    const value = parseInt(inputField.value);
    if (!isNaN(value)) {
        bst.insert(value);
        status.textContent = "Inserted: " + value;
        inputField.value = "";
    } else {
        status.textContent = "Please enter a valid number.";
    }
});

document.getElementById("searchButton").addEventListener("click", () => {
    const value = parseInt(inputField.value);
    if (!isNaN(value)) {
        const found = bst.search(value);
        status.textContent = found ? "Found: " + value : "Not Found: " + value;
    } else {
        status.textContent = "Please enter a valid number.";
    }
});

document.getElementById("removeButton").addEventListener("click", () => {
    const value = parseInt(inputField.value);
    if (!isNaN(value)) {
        bst.remove(value);
        status.textContent = "Removed: " + value;
        inputField.value = "";
    } else {
        status.textContent = "Please enter a valid number.";
    }
});


inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const value = parseInt(inputField.value);
        if (!isNaN(value)) {
            bst.insert(value);
            status.textContent = "Inserted: " + value;
            inputField.value = "";
        } else {
            status.textContent = "Please enter a valid number.";
        }
    }
});
document.getElementById("DelButton").addEventListener("click", () => {
    bst.root = null; 
    bst.drawTree(); 
    status.textContent = "Tree cleared.";
});
