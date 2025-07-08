import React, { useEffect, useRef, useState } from 'react'

function Header() {
  const texts = ["Lukas Dvorsky", "Frontend Developer"];
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 100;
  const pauseDuration = 1500;

  useEffect(() => {
    const fullText = texts[index];
    
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex <= fullText.length) {
      timeout = setTimeout(() => {
        setCurrentText(fullText.slice(0, charIndex));
        setCharIndex(charIndex + 1);
      }, typingSpeed);
    } else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setCurrentText(fullText.slice(0, charIndex));
        setCharIndex(charIndex - 1);
      }, typingSpeed / 2);
    } else if (!isDeleting && charIndex > fullText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && charIndex < 0) {
      setIsDeleting(false);
      setIndex((index + 1) % texts.length);
      setCharIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, texts]);


  return (
    <div className="bg-[url('/header-background.jpg')] bg-cover bg-center h-screen w-full text-white flex items-center">
      <div className='ml-4'>
        <h1 className='text-5xl'>{currentText}</h1>
        <span>Junior Developer</span>
      </div>
    </div>
  )
}

export default Header