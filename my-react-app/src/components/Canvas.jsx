import React, { useEffect, useRef } from "react";
import "../styles/Canvas.css"; // Add any additional styles if needed

const Canvas = ({ exams }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const balls = [];
        const ripples = [];
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const createRipple = (x, y) => ripples.push({ x, y, radius: 0, opacity: 1 });

        const drawRipples = () => {
            ctx.clearRect(0, 0, width, height);
            ripples.forEach((ripple, index) => {
                ripple.radius += 2;
                ripple.opacity -= 0.02;
                if (ripple.opacity <= 0) ripples.splice(index, 1);
                else {
                    ctx.beginPath();
                    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(0, 123, 255, ${ripple.opacity})`;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            });
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e) => createRipple(e.clientX, e.clientY);

        exams.forEach((exam) => {
            const ball = document.createElement("div");
            ball.className = "ball";
            ball.textContent = exam;
            containerRef.current.appendChild(ball);
            const x = Math.random() * (width - 100);
            const y = Math.random() * (height - 100);
            const dx = Math.random() * 2 + 1;
            const dy = Math.random() * 2 + 1;
            balls.push({ element: ball, x, y, dx, dy });
        });

        const animateBalls = () => {
            balls.forEach((ball) => {
                ball.x += ball.dx;
                ball.y += ball.dy;
                if (ball.x <= 0 || ball.x + 100 >= width) ball.dx *= -1;
                if (ball.y <= 0 || ball.y + 100 >= height) ball.dy *= -1;
                ball.element.style.transform = `translate(${ball.x}px, ${ball.y}px)`;
            });
            requestAnimationFrame(animateBalls);
        };

        const animateRipples = () => {
            drawRipples();
            requestAnimationFrame(animateRipples);
        };

        window.addEventListener("resize", handleResize);
        canvas.addEventListener("mousemove", handleMouseMove);

        animateBalls();
        animateRipples();

        return () => {
            window.removeEventListener("resize", handleResize);
            canvas.removeEventListener("mousemove", handleMouseMove);
        };
    }, [exams]);

    return (
        <div className="canvas-container">
            <canvas ref={canvasRef} className="ripple-background"></canvas>
            <div className="floating-balls" ref={containerRef}></div>
        </div>
    );
};

export default Canvas;
