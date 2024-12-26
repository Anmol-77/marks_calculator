import React, { useState, useRef } from 'react';

const CenteredBlockInput = ({ length = 50, onComplete }) => {
  const [values, setValues] = useState(Array(length).fill(''));
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRef = useRef([]);
  const containerRef = useRef(null);

  const handleChange = (index, val) => {
    if (val.length > 1) return;

    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues);

    if (val && index + 1 < values.length) {
      inputRef.current[index + 1].focus();
      setCurrentIndex(index + 1);
    }

    if (newValues.every(val => val !== '') && onComplete) {
      onComplete(newValues.join(''));
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const chars = pastedText.slice(0, length).split('');
    
    const newValues = [...values];
    chars.forEach((char, index) => {
      if (index < length) newValues[index] = char;
    });
    setValues(newValues);
  
    // Focus next empty block
    const nextEmptyIndex = newValues.findIndex(val => !val);
    if (nextEmptyIndex !== -1 && nextEmptyIndex < length) {
      inputRef.current[nextEmptyIndex].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputRef.current[index - 1].focus();
      setCurrentIndex(index - 1);
    }
  };

  return (
    <div className="relative w-full max-w-1xl mx-auto overflow-hidden">
      <div className="flex justify-center items-center">
        <div className="relative flex gap-0.5">
          {values.map((value, index) => {
            const position = index - currentIndex;
            const isVisible = position >= -2 && position <= 2;
            
            return (
              <input
                key={index}
                ref={el => inputRef.current[index] = el}
                type="text"
                value={value}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`
                  w-6 h-6 text-center text-xl border-2 rounded
                  transition-all duration-300 ease-in-out
                  ${index === currentIndex 
                    ? 'border-blue-500 scale-110 opacity-100' 
                    : 'border-gray-300'
                  }
                  ${!isVisible ? 'w-0 opacity-0 p-0 m-0 border-0' : ''}
                  ${position < 0 ? 'opacity-50' : ''}
                  ${position > 0 ? 'opacity-75' : ''}
                  ${Math.abs(position) === 2 ? 'opacity-25' : ''}
                `}
                style={{
                  transform: isVisible ? `translateX(${(position * 0.2)}rem)` : 'translateX(0)',
                  position: isVisible ? 'relative' : 'absolute',
                  left: isVisible ? 'auto' : '-9999px'
                }}
                maxLength={1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CenteredBlockInput;