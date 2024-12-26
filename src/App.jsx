// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import Botany from './components/input'
// import Zoology from './components/input'
// import Physics from './components/input'
// import Chemistry from './components/input'
// import './App.css'
// function App() {

//   let bot;
//   let zoo;
//   let phy;
//   let chem;

//   let actualBot="";
//   let actualZoo="";
//   let actualPhy="";
//   let actualChem="";

//   const onCompleteBot = (value) => {
//     bot=value;
//     console.log('Completed:', value);
//   };
//   const onCompleteZoo = (value) => {
//     zoo=value;
//     console.log('Completed:', value);
//   };
//   const onCompletePhy = (value) => {
//     phy=value;
//     console.log('Completed:', value);
//   };
//   const onCompleteChem = (value) => {
//     chem=value;
//     console.log('Completed:', value);
//   };

//   const handelClick=()=>{
//     let marksBot=0;
//     for(let i=0;i<50;i++){
//       if(bot[i]!=='.'){
//         if(bot[i]===actualBot[i]){
//           marksBot+=4;
//         }
//         else{
//           marksBot-=1;
//         }
//       }
//     }

//     console.log(marksBot);
//   }

//   return (
//     <div className="container mx-auto p-5">
//       <h1 className='justify-center mb-4'>CALCULATE MARKS</h1>
//       {/* Botany */}
//       <div className='mb-4'>
//         <h4 className="label">🌿Botany</h4>
//         <div className="block">
//           <Botany length={50} onComplete={onCompleteBot} />
//         </div>
//       </div>


//       {/* Zoology */}
//       <div className="mb-4">
//         <h4 className="label">🐘Zoology</h4>
//         <div className="block">
//           <Zoology length={50} onComplete={onCompleteZoo} />
//         </div>
//       </div>

//       {/* Physics */}
//       <div className='mb-4'>
//         <h4 className="label">⚡Physics</h4>
//         <div className="block">
//           <Physics length={50} onComplete={onCompletePhy} />
//         </div>
//       </div>

//       {/* Chemistry */}
//       <div className='mb-4'>
//         <h4 className="label">🧪Chemistry</h4>
//         <div className="block">
//           <Chemistry length={50} onComplete={onCompleteChem} />
//         </div>
//       </div>


//       <button onClick={handelClick}>calculate</button>
//     </div>
//   );
// }

// export default App;
import { useState } from 'react'
import Botany from './components/input'
import Zoology from './components/input'
import Physics from './components/input'
import Chemistry from './components/input'
import './App.css'

function App() {
  const [actualAnswers, setActualAnswers] = useState({
    botany: '',
    zoology: '', 
    physics: '',
    chemistry: ''
  });

  const [studentAnswers, setStudentAnswers] = useState({
    botany: '',
    zoology: '',
    physics: '',
    chemistry: ''
  });

  const [marks, setMarks] = useState({
    botany: 0,
    zoology: 0,
    physics: 0,
    chemistry: 0
  });

  const onCompleteBot = (value) => {
    setStudentAnswers(prev => ({...prev, botany: value}));
  };

  const onCompleteZoo = (value) => {
    setStudentAnswers(prev => ({...prev, zoology: value}));
  };

  const onCompletePhy = (value) => {
    setStudentAnswers(prev => ({...prev, physics: value}));
  };

  const onCompleteChem = (value) => {
    setStudentAnswers(prev => ({...prev, chemistry: value}));
  };

  const handelClick = () => {
    const newMarks = {
      botany: calculateMarks(studentAnswers.botany, actualAnswers.botany),
      zoology: calculateMarks(studentAnswers.zoology, actualAnswers.zoology),
      physics: calculateMarks(studentAnswers.physics, actualAnswers.physics),
      chemistry: calculateMarks(studentAnswers.chemistry, actualAnswers.chemistry)
    };
    console.log(newMarks.botany);
    console.log(studentAnswers.botany);
    console.log(actualAnswers.botany);
    setMarks(newMarks);
  }

 const calculateMarks = (userAns, actualAns) => {
   let marks = 0;
   for(let i = 0; i < 50; i++) {
     if(userAns[i] !== '.') {
      if( userAns[i] === actualAns[i]){
        marks += 4;
      }
      else{
        marks -= 1;
      }
    }
   }
   return marks;
 };

 const handleActualAnswers=(x,value)=>{
    setActualAnswers(prev => ({...prev, x: value}))
 }

//  const handelClick = () => {
//    const newMarks = {
//      botany: calculateMarks(bot, actualAnswers.botany),
//      zoology: calculateMarks(zoo, actualAnswers.zoology),
//      physics: calculateMarks(phy, actualAnswers.physics),
//      chemistry: calculateMarks(chem, actualAnswers.chemistry)
//    };
//    setMarks(newMarks);
//  };

 return (
   <div className="container mx-auto p-5">
     <h1 className='text-center text-2xl font-bold mb-8'>CALCULATE MARKS</h1>
     
     <div className='grid grid-cols-2 gap-8'>
       <div className="student-answers">
         <h2 className='text-center text-xl font-semibold mb-4'>Student Answers</h2>
         
         <div className='mb-4'>
           <h4 className="label">🌿 Botany</h4>
           <Botany length={50} onComplete={onCompleteBot} />
           <p className="mt-2">Marks: {marks.botany}</p>
         </div>

         <div className="mb-4">
           <h4 className="label">🐘 Zoology</h4>
           <Zoology length={50} onComplete={onCompleteZoo} />
           <p className="mt-2">Marks: {marks.zoology}</p>
         </div>

         <div className='mb-4'>
           <h4 className="label">⚡ Physics</h4>
           <Physics length={50} onComplete={onCompletePhy} />
           <p className="mt-2">Marks: {marks.physics}</p>
         </div>

         <div className='mb-4'>
           <h4 className="label">🧪 Chemistry</h4>
           <Chemistry length={50} onComplete={onCompleteChem} />
           <p className="mt-2">Marks: {marks.chemistry}</p>
         </div>
       </div>
       
       <div className="actual-answers">
         <h2 className='text-center text-xl font-semibold mb-4'>Actual Answers</h2>
         
         <div className='mb-4'>
           {/* <h4 className="label">🌿 Botany</h4> */}
           <Botany length={50} onComplete={(value) => handleActualAnswers('botany', value)} />
         </div>

         <div className='mb-4'>
           {/* <h4 className="label">🐘 Zoology</h4> */}
           <Zoology length={50} onComplete={(value) => handleActualAnswers('zoology', value)} />
         </div>

         <div className='mb-4'>
           {/* <h4 className="label">⚡ Physics</h4> */}
           <Physics length={50} onComplete={(value) => handleActualAnswers('physics', value)} />
         </div>

         <div className='mb-4'>
           {/* <h4 className="label">🧪 Chemistry</h4> */}
           <Chemistry length={50} onComplete={(value) => handleActualAnswers('chemistry', value)} />
         </div>
       </div>
     </div>

     <div className="text-center mt-6">
       <button 
         className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
         onClick={handelClick}
       >
         Calculate Marks
       </button>
     </div>

     <div className="text-center mt-4">
       <p className="text-lg">Total Marks: {marks.botany + marks.zoology + marks.physics + marks.chemistry}</p>
     </div>
   </div>
 );
}

export default App;