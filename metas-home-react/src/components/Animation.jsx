import { useEffect, useRef } from "react";

export default function Animation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Set canvas size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Rice particle class
    class RiceParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.color = this.getRandomRiceColor();
        this.angle = 0;
        this.angleSpeed = (Math.random() - 0.5) * 0.1;
      }
      getRandomRiceColor() {
        const colors = [
          '#fff8e1', '#ffecb3', '#ffd54f', '#ffb300', '#f9a825',
          '#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.angleSpeed;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size / 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.ellipse(-this.size / 3, -this.size / 4, this.size / 4, this.size / 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    let particles = [];
    let connectionDistance = 100;
    let showConnections = true;

    function createParticles(count) {
      for (let i = 0; i < count; i++) {
        particles.push(new RiceParticle());
      }
    }

    function drawConnections() {
      if (!showConnections) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(255, 214, 0, ${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    let animationFrameId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      if (showConnections) drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    }

    createParticles(150);
    animate();

    // Interactive mouse effect
    const mouseMoveHandler = e => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      particles.forEach(p => {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const force = (100 - distance) / 100;
          p.speedX += (dx / distance) * force * 0.5;
          p.speedY += (dy / distance) * force * 0.5;
        }
      });
    };
    canvas.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", mouseMoveHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="canvas-container">
      <canvas id="riceCanvas" ref={canvasRef}></canvas>
    </div>
  );
}
