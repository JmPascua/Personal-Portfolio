// Boot sequence typewriter 
const bootLines = [
  "> initializing session...",
  "> user: JOHN MARK C. PASCUA",
  "> role: SOFTWARE ENGINEER — DATA ANALYST — WEB DEVELOPER",
  "> status: READY"
];
const bootEl = document.getElementById('boot');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeBoot()
{
  if(reduceMotion)
    {
        bootEl.textContent = bootLines.join('\n');
        return;
    }
        let lineIdx = 0, charIdx = 0;
        let output = "";
        function step()
    {
    if(lineIdx >= bootLines.length)
        {
            bootEl.innerHTML = output.replace('READY','<span class="ok">READY</span>') + '<span class="cursor"></span>';
            return;
        }
        const line = bootLines[lineIdx];
    if(charIdx <= line.length)
        {
            bootEl.textContent = output + line.slice(0, charIdx);
            charIdx++;
            setTimeout(step, 14);
        } 
        else 
        {
            output += line + "\n";
            lineIdx++;
            charIdx = 0;
            setTimeout(step, 120);
        }
  }
  step();
}
typeBoot();

//  Mobile navigation toggle 
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => 
    {
        const open = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open);
    });
navLinks.querySelectorAll('a').forEach(a => 
    {
        a.addEventListener('click', () => 
        {
            navLinks.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

// Scroll reveal 
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window && !reduceMotion)
    {
        const io = new IntersectionObserver((entries) => 
    {
    entries.forEach(entry => 
        {
            if(entry.isIntersecting)
        {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
    revealEls.forEach(el => io.observe(el));
} 
else 
{
  revealEls.forEach(el => el.classList.add('in'));
}
