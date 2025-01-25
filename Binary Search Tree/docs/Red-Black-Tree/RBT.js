class Node {
    constructor(value, color = "red") {
        this.value = value;
        this.color = color;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.x = 0;  
        this.y = 0;  
    }
}

class RedBlackTree {
    constructor() {
        this.nullNode = new Node(null, "black");
        this.nullNode.x = -1000;  
        this.nullNode.y = -1000;
        this.root = this.nullNode;
        this.canvas = document.getElementById("rbtCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth - 20;
        this.canvas.height = window.innerHeight - 100;
    }

  
    insert(value) {
        if (this.search(value)) {
            console.log("Value already exists in the tree.");
            return;
        }

        const newNode = new Node(value);
        newNode.left = this.nullNode;
        newNode.right = this.nullNode;

        let parent = null;
        let current = this.root;

        while (current !== this.nullNode) {
            parent = current;
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        newNode.parent = parent;

        if (parent === null) {
            this.root = newNode;
        } else if (value < parent.value) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }

        newNode.color = "red";
        this.fixInsert(newNode);
        this.drawTree(newNode);
    }

    fixInsert(node) {
        while (node.parent && node.parent.color === "red") {
            let grandparent = node.parent.parent;

            if (node.parent === grandparent.left) {
                let uncle = grandparent.right;

                if (uncle.color === "red") {
                    node.parent.color = "black";
                    uncle.color = "black";
                    grandparent.color = "red";
                    node = grandparent;
                } else {
                    if (node === node.parent.right) {
                        node = node.parent;
                        this.rotateLeft(node);
                    }
                    node.parent.color = "black";
                    grandparent.color = "red";
                    this.rotateRight(grandparent);
                }
            } else {
                let uncle = grandparent.left;

                if (uncle.color === "red") {
                    node.parent.color = "black";
                    uncle.color = "black";
                    grandparent.color = "red";
                    node = grandparent;
                } else {
                    if (node === node.parent.left) {
                        node = node.parent;
                        this.rotateRight(node);
                    }
                    node.parent.color = "black";
                    grandparent.color = "red";
                    this.rotateLeft(grandparent);
                }
            }
        }
        this.root.color = "black";
        this.drawTree();  
    }

    rotateLeft(node) {
        let temp = node.right;
        node.right = temp.left;

        if (temp.left !== this.nullNode) {
            temp.left.parent = node;
        }

        temp.parent = node.parent;

        if (node.parent === null) {
            this.root = temp;
        } else if (node === node.parent.left) {
            node.parent.left = temp;
        } else {
            node.parent.right = temp;
        }

        temp.left = node;
        node.parent = temp;


        this.animateRotation(node, temp, node.x - 100, node.y + 100, temp.x, temp.y);
        this.drawTree();  
    }

    rotateRight(node) {
        let temp = node.left;
        node.left = temp.right;

        if (temp.right !== this.nullNode) {
            temp.right.parent = node;
        }

        temp.parent = node.parent;

        if (node.parent === null) {
            this.root = temp;
        } else if (node === node.parent.right) {
            node.parent.right = temp;
        } else {
            node.parent.left = temp;
        }

        temp.right = node;
        node.parent = temp;

       
        this.animateRotation(node, temp, node.x + 100, node.y + 100, temp.x, temp.y);
        this.drawTree();  
    }

    animateRotation(node, temp, targetX1, targetY1, targetX2, targetY2) {
        const dx1 = (targetX1 - node.x) * 0.1;
        const dy1 = (targetY1 - node.y) * 0.1;

        const dx2 = (targetX2 - temp.x) * 0.1;
        const dy2 = (targetY2 - temp.y) * 0.1;

        const animate = () => {
            node.x += dx1;
            node.y += dy1;

            temp.x += dx2;
            temp.y += dy2;

            if (Math.abs(dx1) > 0.1 || Math.abs(dy1) > 0.1 || Math.abs(dx2) > 0.1 || Math.abs(dy2) > 0.1) {
                requestAnimationFrame(animate);
            } else {
                node.x = targetX1;
                node.y = targetY1;
                temp.x = targetX2;
                temp.y = targetY2;
            }
            this.drawTree();
        };

        animate();
    }

    search(value) {
        const node = this.searchNode(this.root, value);
        return node !== this.nullNode;
    }

    searchNode(node, value) {
        if (node === this.nullNode || node.value === value) {
            return node;
        }
        if (value < node.value) {
            return this.searchNode(node.left, value);
        } else {
            return this.searchNode(node.right, value);
        }
    }

    highlightSearchPath(value) {
        const path = this.findPath(this.root, value);
        if (path) {
            this.animateSearch(path);
        }
    }

    findPath(node, value) {
        if (node === this.nullNode || node.value === value) {
            return [node];
        }
        if (value < node.value) {
            const leftPath = this.findPath(node.left, value);
            if (leftPath) {
                return [node, ...leftPath];
            }
        } else {
            const rightPath = this.findPath(node.right, value);
            if (rightPath) {
                return [node, ...rightPath];
            }
        }
        return null;
    }

    animateSearch(path) {
        let index = 0;

        const highlightNextNode = () => {
            if (index < path.length) {
                const node = path[index];
                const originalColor = node.color;
                node.color = "yellow";  

               
                if (index === path.length - 1) {
                    node.color = "green";  
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

    drawTree() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawNode(this.root, this.canvas.width / 2, 50, 100);
    }

    drawNode(node, x, y, xOffset) {
        if (node === this.nullNode) return;

        const bubbleRadius = 30;
        this.ctx.font = "18px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        this.ctx.fillStyle = node.color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, bubbleRadius, 0, Math.PI * 2); 
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.fillStyle = "white";
        this.ctx.fillText(node.value, x, y);

        if (node.left !== this.nullNode) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x - xOffset, y + 50);
            this.ctx.stroke();
            this.drawNode(node.left, x - xOffset, y + 50, xOffset / 2);
        }

        if (node.right !== this.nullNode) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + xOffset, y + 50);
            this.ctx.stroke();
            this.drawNode(node.right, x + xOffset, y + 50, xOffset / 2);
        }
    }
}

const tree = new RedBlackTree();

document.getElementById("insertButton").addEventListener("click", () => {
    const value = parseInt(document.getElementById("nodeValue").value);
    if (!isNaN(value)) {
        tree.insert(value);
    }
});

document.getElementById("deleteButton").addEventListener("click", () => {
    const value = parseInt(document.getElementById("nodeValue").value);
    if (!isNaN(value)) {
        tree.delete(value);
    }
});

document.getElementById("searchButton").addEventListener("click", () => {
    const value = parseInt(document.getElementById("nodeValue").value);
    if (!isNaN(value)) {
        tree.highlightSearchPath(value);
    }
});

document.getElementById("clearButton").addEventListener("click", () => {
    tree.root = tree.nullNode;
    tree.drawTree();
    document.getElementById("status").textContent = "Tree cleared.";
});

document.getElementById("nodeValue").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const value = parseInt(document.getElementById("nodeValue").value);
        if (!isNaN(value)) {
            tree.insert(value); 
        }
    }
});
