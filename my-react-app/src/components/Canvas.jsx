import React, { useEffect, useRef } from "react";
import "../styles/Canvas.css";

const Canvas = () => {
    const canvasRef = useRef(null);
    const bubbles = useRef([]);
    const examNames = [
        "JEE Advanced",
        "JEE Main",
        "NEET",
        "GATE",
        "CAT",
        "UPSC CSE",
        "SSC CGL",
        "IBPS PO",
        "CLAT",
        "NDA",
        
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const ripples = [];
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const createRipple = (x, y) => {
            ripples.push({ x, y, radius: 0, opacity: 1 });
        };

        const createBubble = () => {
            const randomExam = examNames[Math.floor(Math.random() * examNames.length)];
            const radius = Math.random() * 20 + 10; // Calculate radius first
        
            bubbles.current.push({
                x: Math.random() * (width - 2 * radius) + radius, // Ensure bubble fits within screen width
                y: Math.random() * (height - 2 * radius) + radius, // Ensure bubble fits within screen height
                radius: radius,
                speedX: (Math.random() - 0.5) * 2, // Random horizontal speed
                speedY: (Math.random() - 0.5) * 2, // Random vertical speed
                opacity: Math.random() * 0.5 + 0.5,
                text: randomExam,
            });
        };
        

        const drawRipples = () => {
            ripples.forEach((ripple, index) => {
                ripple.radius += 2;
                ripple.opacity -= 0.02;

                if (ripple.opacity <= 0) {
                    ripples.splice(index, 1);
                } else {
                    ctx.beginPath();
                    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(0, 123, 255, ${ripple.opacity})`;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            });
        };

        const drawBubbles = () => {
            bubbles.current.forEach((bubble) => {
                bubble.x += bubble.speedX;
                bubble.y += bubble.speedY;
        
                // Boundary collision detection and rebound logic
                if (bubble.x - bubble.radius <= 0 || bubble.x + bubble.radius >= width) {
                    bubble.speedX = -bubble.speedX; // Reverse horizontal direction
                }
                if (bubble.y - bubble.radius <= 0 || bubble.y + bubble.radius >= height) {
                    bubble.speedY = -bubble.speedY; // Reverse vertical direction
                }
        
                // Draw the bubble
                ctx.beginPath();
                ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 123, 255, ${bubble.opacity})`;
                ctx.fill();
        
                // Draw the text
                ctx.font = `${bubble.radius / 2}px Arial`;
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText(bubble.text, bubble.x, bubble.y + 4);
            });
        };
        

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e) => {
            createRipple(e.clientX, e.clientY);
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height); // Clear canvas
            drawRipples();
            drawBubbles();
            requestAnimationFrame(animate);
        };

        // Add initial bubbles
        for (let i = 0; i < 30; i++) {
            createBubble();
        }

        window.addEventListener("resize", handleResize);
        canvas.addEventListener("mousemove", handleMouseMove);

        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            canvas.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="canvas-container">
            <canvas ref={canvasRef} className="ripple-background"></canvas>
        </div>
    );
};

export default Canvas;
