import React,{useState} from 'react'
import Header from '../TopProgressBar/index'
import './style.css'
import Quiz from '../../Data/questions.json'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import QuizLevel from './QuizLevel/index'
import MultiSlider, { Progress, Dot } from 'react-multi-bar-slider';

export default ({
inp
}) => {
    
    let [index, setindex] = useState(0)
    let [score, setScore] = useState(0)
    let [next, setNext] = useState(false)
    let [current, setCurrent] = useState(0)
    let [success, setSuccess] = useState(0)
    let [fail, setFail] = useState(0)
    let [selected, setSelected] = useState()
    let [level, setLevel] = useState('easy')
    let [quizLength, setQuizLength] = useState(Quiz.filter(val=>val.difficulty === 'easy').length )
    let [quizToRender, setQuizToRender] = useState(Quiz.filter(val=>val.difficulty === 'easy'))

    



    // level handler 
    const levelHandler = (event)=>{
        event.preventDefault();
        console.log('eee',event.target)
        if(event.target.value === '1'){
            setLevel('easy')
            setQuizToRender(Quiz.filter(val=>val.difficulty === 'easy'))
            setQuizLength(Quiz.filter(val=>val.difficulty === 'easy').length )
            
        }else if(event.target.value === '2'){
            setLevel('medium')
            setQuizToRender(Quiz.filter(val=>val.difficulty === 'medium'))
            setQuizLength(Quiz.filter(val=>val.difficulty === 'medium').length  )
        }else if(event.target.value === '3' || event.target.value === '4' || event.target.value === '5'){
            setLevel('hard')
            setQuizToRender(Quiz.filter(val=>val.difficulty === 'hard'))
            setQuizLength(Quiz.filter(val=>val.difficulty === 'hard').length )
        }else return
    }
   const changeHandler = (event)=>{
       event.preventDefault();
       setSelected(event.target.value)
       setNext(true)
    }

    const Next_ = () => {
        if(JSON.stringify(quizToRender[index].correct_answer) === selected){
            setScore(score+1)
            setNext(true)
            progressAnalyzer(score+1)
        }else{
            setNext(true)
            progressAnalyzer(score)
        }
        
        setindex(index+1)
         setNext(false)
    }

    const progressAnalyzer = (sc) =>{
        let cur = (sc/(index+1))*100 
        setCurrent(cur)
        
        let fail = sc ?( ( sc/quizLength)*100):100
            fail = sc ?(100 - fail):100
        setFail(fail)
        
        let suc =  (sc+(quizLength-(index+1)))
        suc = (suc/quizLength)*100
        console.log(' succc',suc, )
        setSuccess(suc)
        console.log('cur',cur,'success',suc,'fail',fail,'====',sc)
    } 

    console.log('Quiz',Quiz, 'easy ====>',quizToRender)
  
    return(
        <div>

            <Header progress={index <quizLength ? index+1: quizLength} quizLength={quizLength} />
        <div className='Quiz-Container'>

            <div>
    <p> Question {index+1} of {quizLength}</p>
   <QuizLevel level={level} levelHandler={levelHandler}/>
            </div>
          
                  
                       <p style={{overflow:'hidden'}}>{quizToRender[index]?.question}</p>
<div >

                       <RadioGroup  name="gender1" onChange={changeHandler} >
                       <FormControlLabel value={JSON.stringify(quizToRender[index]?.incorrect_answers[0])} control={<Radio />} label={quizToRender[index]?.incorrect_answers[0]}  />
                      <FormControlLabel value={JSON.stringify(quizToRender[index]?.incorrect_answers[1])} control={<Radio />} label={quizToRender[index]?.incorrect_answers[1]} />
                      <FormControlLabel value={JSON.stringify(quizToRender[index]?.incorrect_answers[2])} control={<Radio />} label={quizToRender[index]?.incorrect_answers[2]} />
                       <FormControlLabel
                       value={JSON.stringify(quizToRender[index]?.correct_answer)}
                       control={<Radio />}
                       label={quizToRender[index]?.correct_answer}
                       />
                  </RadioGroup>
                       </div>

                       <div style={{marginTop:'30px',width:'80%',display:'flex',justifyContent:'flex-end'}}>


       {index !== quizLength? <Button variant="contained" disabled={index === quizLength || !next} color="secondary" onClick={Next_} >Next</Button>
  :
        <Button variant="contained" disabled={index !== quizLength } color="primary" onClick={()=>{setindex(0) || setSuccess(0) || setFail(0) || setCurrent(0)}} >Re Start</Button>
        }               </div>

                   
               
        </div>
       
                       <div className='BottomProgress'>

                           {/* <div className='Failure' style={{minWidth:fail}}  > </div>

                           <div className='current' style={{minWidth:current}}> </div>

                           <div className='future' style={{minWidth:success}}></div> */}
100%
                       <MultiSlider
        width={'100%'}
        height={20}
        slidableZoneSize={40}
        backgroundColor="bisque"
        equalColor="blue"
        style={{ marginBottom: 40 }}
        onSlide={(v)=>console.log('vv',v)}
        onDragStart={progress => console.log(`Started dragging: ${progress}%`)}
        onDragStop={progress => console.log(`Stopped dragging: ${progress}%`)}
        roundedCorners
        reversed
        >
        <Progress color="purple" height={'100%'} progress={success}>
         <Dot color='purple'/>
        </Progress>
        <Progress color="green" height={'100%'} progress={current}>
        <Dot color="green" />
        </Progress>
        <Progress color="red"  height={'100%'} progress={fail}>
         <Dot color='red' />
        </Progress>
      </MultiSlider>
      0%
                       </div>





        

                       
        </div>
    )
}