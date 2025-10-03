"use client"
import { AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import QuizResult from './quiz-result';

const QuizList = ({assessments}) => {
  const router=useRouter();
  const [selectQuiz,setSelectedQuiz]=useState(null);


  return (
    <>
      <Card>
  <CardHeader className="flex flex-row items-center justify-between">
    <div>
    <CardTitle className="gradies-tile text-3xl md:text-4xl">Recent Quizees</CardTitle>
    <CardDescription>Review your past performance </CardDescription>
</div>

    <Button onClick={()=>{router.push("/interview/mock")}}>Start New Quiz</Button>
    
  </CardHeader>
  <CardContent>
    <div className='space-y-4'>
      {assessments.map((assessments,i)=>{
        return(
          <Card
           key={assessments.id}
           className='cursor-pointer hover:bg-muted/50 transition-colors'
          onClick={()=>setSelectedQuiz(assessments )}>
  <CardHeader>
    <CardTitle>Quiz {i+1}</CardTitle>
    <CardDescription>
      <div>Score: {assessments.quizScore.toFixed(1)}%</div>
      <div>
        {format(
          new Date(assessments.createdAt),
          "MMMM dd,yyyy HH:mm"
        )}
      </div>
    </CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <p className='text-sm text-muted-foreground'>
      {assessments.improvementTip}
    </p>
  </CardContent>
</Card>
        )
      })}
    </div>
  </CardContent>
</Card>

{/* including the dialog */}

<Dialog open={!!selectQuiz} onOpenChange={()=>setSelectedQuiz(null)}>
  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
       <DialogTitle></DialogTitle>
      </DialogHeader>
      <QuizResult
      result={selectQuiz}
      onStartNew={()=>router.push("/interview/mock")}
      hideStartNew/>
  </DialogContent>
</Dialog>
    </>
  )
}

export default QuizList
