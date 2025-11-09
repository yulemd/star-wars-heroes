import { useEffect, useRef } from 'react';

export const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Зірки
    const stars: {
      x: number;
      y: number;
      size: number;
      speed: number;
      alphaOffset: number;
    }[] = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
        alphaOffset: Math.random() * Math.PI * 2,
      });
    }

    // Комета
    const comet = {
      x: -100,
      y: Math.random() * height * 0.5,
      size: 3 + Math.random() * 2,
      speed: 5 + Math.random() * 2,
    };

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Зірки
      stars.forEach((star) => {
        const alpha =
          0.6 +
          Math.sin(Date.now() * star.speed * 0.002 + star.alphaOffset) * 0.4;
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Комета
      ctx.fillStyle = 'rgba(255,255,255,1)';
      ctx.beginPath();
      ctx.arc(comet.x, comet.y, comet.size, 0, Math.PI * 2);
      ctx.fill();

      // Хвіст комети
      const tailLength = 15;
      for (let i = 0; i < tailLength; i++) {
        const alpha = 0.6 * (1 - i / tailLength);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(
          comet.x - i * 2,
          comet.y - i * 1.5,
          comet.size * 0.8,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }

      // Рух комети
      comet.x += comet.speed;
      comet.y += comet.speed * 0.3;

      if (comet.x - comet.size > width || comet.y - comet.size > height) {
        comet.x = -100;
        comet.y = Math.random() * height * 0.5;
        comet.size = 3 + Math.random() * 2;
        comet.speed = 5 + Math.random() * 2;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
};
