import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Matter from "matter-js";

const useFooterPhysicsAlt = (sectionRef, containerRef) => {
  useEffect(() => {
    const sectionEl = sectionRef?.current;
    const container = containerRef?.current;
    if (!sectionEl || !container) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const animateOnScroll = true;

    const config = {
      gravity: { x: 0, y: 1.1 },
      restitution: 0.55,
      friction: 0.16,
      frictionAir: 0.015,
      density: 0.0022,
      wallThickness: 200,
      mouseStiffness: 0.6,
    };

    let engine,
      runner,
      mouseConstraint,
      bodies = [],
      topWall = null;

    function clamp(val, min, max) {
      return Math.max(min, Math.min(max, val));
    }

    function initPhysics() {
      engine = Matter.Engine.create();
      engine.gravity = config.gravity;
      engine.constraintIterations = 10;
      engine.positionIterations = 20;
      engine.velocityIterations = 16;
      engine.timing.timeScale = 1;

      const containerRect = container.getBoundingClientRect();
      const wallThickness = config.wallThickness;

      const walls = [
        Matter.Bodies.rectangle(
          containerRect.width / 2,
          containerRect.height + wallThickness / 2,
          containerRect.width + wallThickness * 2,
          wallThickness,
          { isStatic: true }
        ),
        Matter.Bodies.rectangle(
          -wallThickness / 2,
          containerRect.height / 2,
          wallThickness,
          containerRect.height + wallThickness * 2,
          { isStatic: true }
        ),
        Matter.Bodies.rectangle(
          containerRect.width + wallThickness / 2,
          containerRect.height / 2,
          wallThickness,
          containerRect.height + wallThickness * 2,
          { isStatic: true }
        ),
      ];

      Matter.World.add(engine.world, walls);

      const hoverRadius = 40;
      const hoverBody = Matter.Bodies.circle(-9999, -9999, hoverRadius, {
        isStatic: true,
        friction: 0,
        restitution: config.restitution,
        render: { visible: false },
      });

      Matter.World.add(engine.world, hoverBody);
      const hoverBoostRadius = 160;
      const hoverForce = 0.12;
      const hoverOrbitForce = 0.02;
      const hoverImpulse = 0.0026;
      const hoverDirectional = 0.005;
      const hoverLift = 0.003;
      const separationRadius = 38;
      const separationForce = 0.00012;
      const edgePadding = 60;
      const edgeForce = 0.00025;
      const stackRadius = 140;
      const stackHeightFactor = 28;
      const stackHeightMax = 220;
      const stackAttract = 0.0009;
      const stackPush = 0.0018;
      const stackSpeedThreshold = 0.6;
      const slotGap = 56;
      const slotPadding = 24;
      const settleStrength = 0.0003;
      let lastMouse = null;
      let settleEnabled = false;
      let settleStartTime = 0;
      let targetSlots = [];

      const objects = container.querySelectorAll(".object");
      const columns = Math.max(
        1,
        Math.floor((containerRect.width - slotPadding * 2) / slotGap)
      );
      const rows = Math.max(
        1,
        Math.ceil(objects.length / columns)
      );
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < columns; col += 1) {
          targetSlots.push({
            x: slotPadding + col * slotGap + slotGap / 2,
            y: containerRect.height - slotPadding - row * slotGap,
          });
        }
      }
      objects.forEach((obj, index) => {
        const objRect = obj.getBoundingClientRect();
        const scaledWidth = objRect.width;
        const scaledHeight = objRect.height;

        const startX =
          Math.random() * (containerRect.width - objRect.width) +
          objRect.width / 2;
        const startY = -80 - Math.random() * 220;
        const startRotation = (Math.random() - 0.5) * Math.PI;

        const body = Matter.Bodies.rectangle(
          startX,
          startY,
          scaledWidth,
          scaledHeight,
          {
            restitution: config.restitution,
            friction: config.friction,
            frictionAir: config.frictionAir,
            density: config.density,
          }
        );

        Matter.Body.setAngle(body, startRotation);
        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * 2.2,
          y: Math.random() * 1.2,
        });

        bodies.push({
          body: body,
          element: obj,
          width: scaledWidth,
          height: scaledHeight,
        });

        Matter.World.add(engine.world, body);
      });

      settleStartTime = performance.now() + 2500;

      setTimeout(() => {
        topWall = Matter.Bodies.rectangle(
          containerRect.width / 2,
          -wallThickness / 2,
          containerRect.width + wallThickness * 2,
          wallThickness,
          { isStatic: true }
        );
        Matter.World.add(engine.world, topWall);
      }, 3000);

      const mouse = Matter.Mouse.create(container);
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

      mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: config.mouseStiffness,
          render: { visible: false },
        },
      });

      mouseConstraint.mouse.element.oncontextmenu = () => false;

      let dragging = null;
      let originalInertia = null;

      Matter.Events.on(mouseConstraint, "startdrag", function (event) {
        dragging = event.body;
        if (dragging) {
          originalInertia = dragging.inertia;
          Matter.Body.setInertia(dragging, Infinity);
          Matter.Body.setVelocity(dragging, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(dragging, 0);
        }
      });

      Matter.Events.on(mouseConstraint, "enddrag", function () {
        if (dragging) {
          Matter.Body.setInertia(dragging, originalInertia || 1);
          dragging = null;
          originalInertia = null;
        }
      });

      Matter.Events.on(engine, "beforeUpdate", function () {
        if (dragging) {
          const found = bodies.find((b) => b.body === dragging);
          if (found) {
            const minX = found.width / 2;
            const maxX = containerRect.width - found.width / 2;
            const minY = found.height / 2;
            const maxY = containerRect.height - found.height / 2;

            Matter.Body.setPosition(dragging, {
              x: clamp(dragging.position.x, minX, maxX),
              y: clamp(dragging.position.y, minY, maxY),
            });

            Matter.Body.setVelocity(dragging, {
              x: clamp(dragging.velocity.x, -20, 20),
              y: clamp(dragging.velocity.y, -20, 20),
            });
          }
        }

        if (!settleEnabled) {
          const now = performance.now();
          if (now >= settleStartTime) {
            const slowEnough = bodies.every(
              ({ body }) =>
                Math.abs(body.velocity.y) < 1.2 && Math.abs(body.velocity.x) < 1.2
            );
            const lowEnough = bodies.every(
              ({ body }) => body.position.y > containerRect.height * 0.45
            );
            if (slowEnough && lowEnough) {
              settleEnabled = true;
            }
          }
        }

        if (settleEnabled) {
          const availableSlots = targetSlots.slice();
          const assignments = new Map();
          bodies.forEach(({ body }, index) => {
            if (body === dragging) {
              return;
            }
            let bestIndex = -1;
            let bestDist = Infinity;
            for (let i = 0; i < availableSlots.length; i += 1) {
              const slot = availableSlots[i];
              const dx = slot.x - body.position.x;
              const dy = slot.y - body.position.y;
              const distSq = dx * dx + dy * dy;
              if (distSq < bestDist) {
                bestDist = distSq;
                bestIndex = i;
              }
            }
            if (bestIndex !== -1) {
              const slot = availableSlots.splice(bestIndex, 1)[0];
              assignments.set(index, slot);
            }
          });

          bodies.forEach(({ body }, index) => {
            if (body === dragging) {
              return;
            }
            const slot = assignments.get(index);
            if (!slot) {
              return;
            }
            const dx = slot.x - body.position.x;
            const dy = slot.y - body.position.y;
            Matter.Body.applyForce(body, body.position, {
              x: dx * settleStrength,
              y: dy * settleStrength,
            });
          });
        }

        bodies.forEach(({ body }, i) => {
          for (let j = i + 1; j < bodies.length; j += 1) {
            const other = bodies[j].body;
            const dx = other.position.x - body.position.x;
            const dy = other.position.y - body.position.y;
            const distSq = dx * dx + dy * dy;
            if (distSq === 0 || distSq > separationRadius * separationRadius) {
              continue;
            }
            const dist = Math.sqrt(distSq);
            const push = separationForce * (1 - dist / separationRadius);
            const fx = (dx / dist) * push;
            const fy = (dy / dist) * push;
            Matter.Body.applyForce(body, body.position, { x: -fx, y: -fy });
            Matter.Body.applyForce(other, other.position, { x: fx, y: fy });
          }
        });

        bodies.forEach(({ body }) => {
          if (body.position.x < edgePadding) {
            Matter.Body.applyForce(body, body.position, {
              x: edgeForce * (1 - body.position.x / edgePadding),
              y: 0,
            });
          } else if (body.position.x > containerRect.width - edgePadding) {
            const dist = containerRect.width - body.position.x;
            Matter.Body.applyForce(body, body.position, {
              x: -edgeForce * (1 - dist / edgePadding),
              y: 0,
            });
          }
        });
      });

      container.addEventListener("mouseleave", () => {
        mouseConstraint.constraint.bodyB = null;
        mouseConstraint.constraint.pointB = null;
      });

      const moveHoverBody = (event) => {
        const rect = container.getBoundingClientRect();
        const x = clamp(event.clientX - rect.left, 0, rect.width);
        const y = clamp(event.clientY - rect.top, 0, rect.height);
        Matter.Body.setPosition(hoverBody, { x, y });
        const now = performance.now();
        let mouseVx = 0;
        let mouseVy = 0;
        if (lastMouse) {
          const dt = Math.max(1, now - lastMouse.t);
          mouseVx = (x - lastMouse.x) / dt;
          mouseVy = (y - lastMouse.y) / dt;
        }
        lastMouse = { x, y, t: now };
        bodies.forEach(({ body }) => {
          const dx = body.position.x - x;
          const dy = body.position.y - y;
          const distSq = dx * dx + dy * dy;
          if (distSq === 0 || distSq > hoverBoostRadius * hoverBoostRadius) {
            return;
          }
          const dist = Math.sqrt(distSq);
          const influence = 1 - dist / hoverBoostRadius;
          const strength = hoverForce * influence;
          const mouseSpeed = Math.min(5.5, Math.abs(mouseVx) + Math.abs(mouseVy));
          const boostedSpeed = mouseSpeed * mouseSpeed;
          const dirLen = Math.max(0.0001, Math.hypot(mouseVx, mouseVy));
          const dirX = mouseVx / dirLen;
          const dirY = mouseVy / dirLen;
          const orbitStrength = hoverOrbitForce * boostedSpeed * influence;
          const liftStrength = hoverLift * boostedSpeed * Math.max(0, -dirY);
          Matter.Body.applyForce(body, body.position, {
            x: (dx / dist) * strength,
            y: (dy / dist) * strength,
          });
          Matter.Body.applyForce(body, body.position, {
            x: dirX * hoverDirectional * boostedSpeed * influence,
            y: dirY * hoverDirectional * boostedSpeed * influence,
          });
          Matter.Body.applyForce(body, body.position, {
            x: (-dy / dist) * orbitStrength,
            y: (dx / dist) * orbitStrength,
          });
          Matter.Body.applyForce(body, body.position, {
            x: (dx / dist) * hoverImpulse * boostedSpeed * influence,
            y: (dy / dist) * hoverImpulse * boostedSpeed * influence,
          });
          Matter.Body.applyForce(body, body.position, {
            x: 0,
            y: -liftStrength,
          });

          if (mouseSpeed > stackSpeedThreshold) {
            const stackHeight = Math.min(
              stackHeightMax,
              Math.max(24, mouseSpeed * stackHeightFactor)
            );
            const targetX = x + dirX * stackHeight * 0.7;
            const targetY = y - stackHeight;
            const toStackX = targetX - body.position.x;
            const toStackY = targetY - body.position.y;
            Matter.Body.applyForce(body, body.position, {
              x: toStackX * stackAttract,
              y: toStackY * stackAttract,
            });
            Matter.Body.applyForce(body, body.position, {
              x: dirX * stackPush * mouseSpeed,
              y: 0,
            });
          }
        });
      };

      container.addEventListener("mousemove", moveHoverBody);

      document.addEventListener("mouseup", () => {
        mouseConstraint.constraint.bodyB = null;
        mouseConstraint.constraint.pointB = null;
      });

      Matter.World.add(engine.world, mouseConstraint);

      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      function updatePositions() {
        bodies.forEach(({ body, element, width, height }) => {
          const x = clamp(
            body.position.x - width / 2,
            0,
            containerRect.width - width
          );
          const y = clamp(
            body.position.y - height / 2,
            -height * 3,
            containerRect.height - height
          );

          element.style.left = x + "px";
          element.style.top = y + "px";
          element.style.transform = `rotate(${body.angle}rad)`;
        });

        requestAnimationFrame(updatePositions);
      }
      updatePositions();
    }

    if (animateOnScroll) {
      ScrollTrigger.create({
        trigger: sectionEl,
        start: "top bottom",
        once: true,
        onEnter: () => {
          if (!engine) {
            initPhysics();
          }
        },
      });

      if (sectionEl.getBoundingClientRect().top < window.innerHeight) {
        if (!engine) {
          initPhysics();
        }
      }
    } else {
      window.addEventListener("load", () => {
        if (!engine) {
          initPhysics();
        }
      });
    }
  }, [sectionRef, containerRef]);
};

export default useFooterPhysicsAlt;
