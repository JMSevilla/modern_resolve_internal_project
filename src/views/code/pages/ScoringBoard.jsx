import React, {useState, useRef, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MUIButton from '../../../components/Button/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MUIText from '../../../components/TextField/TextField'

const ScoringBoard = () => {
    const [team, setTeam] = useState({
        teamObj : {
            teamA: null,
            teamB: null
        }
    })
    const [score, setScore] = useState({
        scoreObj : {
            teamAScore : 0,
            teamBScore : 0
        }
    })
    const [errorRequest, setErrorRequest] = useState(
        {
            errorHandler : {
                errorLoggerTeamA : false,
                errorLoggerTeamB : false,
            }
        }
    )
    const [quarter, setQuarter] = useState({
        quarterObj : {
            firstQuarter : true,
            secondQuarter : false,
            thirdQuarter : false,
            fourthQuarter : false
        }
    })
    const [errorHelperText, setHelperText] = useState('')
    const [gameTime, setGameTime] = useState(600) //1200 = 20mins / 600 = 10mins
    const [shotTime, setShotTime] = useState(24) // 24 shot clock
    const [isShotTime, isSetShotTime] = useState(false)
    const [gametimeStart, setGameTimeStart] = useState(false)
    const [adduserState, setadduserState] = useState(false)
    const firstStart = useRef(true)
    const tick = useRef();
    const shotRefStart = useRef(true)
    const shotTick = useRef()
    const defaultValueSetter = () => {
        setTeam(prev => {
            let teamObj = Object.assign({}, prev.teamObj)
            teamObj.teamA = "Team A"
            teamObj.teamB = "Team B"
            return {teamObj}
        })
    }
    const defaultScoreValueSetter = () => {
        setScore(prev => {
            let scoreObj = Object.assign({}, prev.scoreObj)
            scoreObj.teamAScore = 0
            scoreObj.teamBScore = 0
            return { scoreObj }
        })
    }
    useEffect(() => {
        defaultScoreValueSetter()
         defaultValueSetter()
        },[])
    useEffect(() => {
        if(firstStart.current) {
            firstStart.current = !firstStart.current;
            return;
        }

        if(gametimeStart) {
            tick.current = setInterval(() => {
                setGameTime((gameTime) => gameTime == 0 ? gameTime = 600 : gameTime -1);
            }, 1000)
        } else {
            clearInterval(tick.current)
        }

        
        return () => clearInterval(tick.current)
    }, [gametimeStart])
    useEffect(() => {
        if(shotRefStart.current) {
            shotRefStart.current = !shotRefStart.current;
            return;
        }

        if(isShotTime) {
            shotTick.current = setInterval(() => {
                setShotTime((shotTime) => shotTime == 0 ? shotTime = 24 : shotTime -1);
            }, 1000)
        } else {
            clearInterval(shotTick.current)
        }
        return () => clearInterval(shotTick.current)
    }, [isShotTime])
    const dispSecondsAsMins = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const seconds_ = seconds % 60
        return mins.toString() + ":" + ((seconds_ == 0) ? "00" : seconds_.toString())
    }
    const ShotClockdispSecondsAsMins = (seconds) => {
        return seconds.toString()
    }
    const handleStartGameTime = () => {
        setGameTimeStart(!gametimeStart)
    }
    const handleStartShotTime = () => {
        isSetShotTime(!isShotTime)
    }
    const handleCancel = () => {
        setadduserState(false)
    }
    const handleGameSettings = () => {
        setadduserState(!adduserState)
    }
    const handleTeamOne = event => {
        if(event.target.value === null || event.target.value === '') {
            setErrorRequest(errorState => {
                let errorHandler = Object.assign({}, errorState.errorHandler)
                errorHandler.errorLoggerTeamA = true
                return {errorHandler}
            })
            setTeam(prev => {
                let teamObj = Object.assign({}, prev.teamObj)
                teamObj.teamA = ""
                return {teamObj}
            })
            setHelperText("Empty field")
        } else {
            setErrorRequest(errorState => {
                let errorHandler = Object.assign({}, errorState.errorHandler)
                errorHandler.errorLoggerTeamA = false
                return {errorHandler}
            })
            setTeam(prev => {
                let teamObj = Object.assign({}, prev.teamObj)
                teamObj.teamA = event.target.value
                return {teamObj}
            })
            setHelperText("")
        }
    }
    const handleTeamTwo = event => {
        if(event.target.value === null || event.target.value === '') {
            setErrorRequest(errorState => {
                let errorHandler = Object.assign({}, errorState.errorHandler)
                errorHandler.errorLoggerTeamB = true
                return {errorHandler}
            })
            setTeam(prev => {
                let teamObj = Object.assign({}, prev.teamObj)
                teamObj.teamB = ""
                return {teamObj}
            })
            setHelperText("Empty field")
        } else {
            setErrorRequest(errorState => {
                let errorHandler = Object.assign({}, errorState.errorHandler)
                errorHandler.errorLoggerTeamB = false
                return {errorHandler}
            })
            setTeam(prev => {
                let teamObj = Object.assign({}, prev.teamObj)
                teamObj.teamB = event.target.value
                return {teamObj}
            })
            setHelperText("")
        }
    }
    const handleGameSettingsSave = () => {
        setadduserState(false)
    }
    const handleScore = (score, x) => {
        if(x === 'teamA')
            setScore(state => {
                let scoreObj = Object.assign({}, state.scoreObj)
                scoreObj.teamAScore = scoreObj.teamAScore += score
                return { scoreObj }
            })
        else
            setScore(state => {
                let scoreObj = Object.assign({}, state.scoreObj)
                scoreObj.teamBScore = scoreObj.teamBScore += score
                return { scoreObj }
            })
    }
    const handleDeductScore = (score, y) => {
        if(y === 'teamA')
            setScore(state => {
                let scoreObj = Object.assign({}, state.scoreObj)
                scoreObj.teamAScore = scoreObj.teamAScore -= score
                return { scoreObj }
            })
        else
            setScore(state => {
                let scoreObj = Object.assign({}, state.scoreObj)
                scoreObj.teamBScore = scoreObj.teamBScore -= score
                return { scoreObj }
            })
    }
    const handleOnChangeQuarter = (quarter) => {
        if(quarter.firstQuarter) {
            setQuarter(state => {
                let quarterObj = Object.assign({}, state.quarterObj)
                quarterObj.secondQuarter = true
                quarterObj.firstQuarter = false
                return { quarterObj }
            })
        } else if(quarter.secondQuarter) {
            setQuarter(state => {
                let quarterObj = Object.assign({}, state.quarterObj)
                quarterObj.secondQuarter = false
                quarterObj.thirdQuarter = true
                return { quarterObj }
            })
        } else if(quarter.thirdQuarter) {
            setQuarter(state => {
                let quarterObj = Object.assign({}, state.quarterObj)
                quarterObj.thirdQuarter = false
                quarterObj.fourthQuarter = true
                return { quarterObj }
            })
        } else{
            setQuarter(state => {
                let quarterObj = Object.assign({}, state.quarterObj)
                quarterObj.fourthQuarter = false
                quarterObj.firstQuarter = true
                return { quarterObj }
            })
        }
    }
    return (
        <>
        {
                                MUIButton({
                                    variant : "contained",
                                    buttonName: "Game Settings",
                                    stylish : {marginTop: '5px', marginBottom: '5px'},
                                    onhandleClick : handleGameSettings
                                })
                            }
            <Dialog
                maxWidth='lg'
                fullWidth={true}
                open={adduserState}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                Game Settings
                </DialogTitle>
                <DialogContent>
                    Team Settings
                    <hr />
                    <div className="row">
                        <div className="col-sm">
                        {
                                MUIText({
                                    typography : "Team A",
                                    dataOnChange : handleTeamOne,
                                    id: "outlined-basic",
                                    label: "Enter team A",
                                    type : "text",
                                    stylish : {width: '100%'},
                                    variant : "outlined",
                                    isError : errorRequest.errorHandler.errorLoggerTeamA,
                                    helperTextHelper : errorHelperText,
                                    value : (team.teamObj === undefined) ? defaultValueSetter : team.teamObj.teamA
                                  })
                        }
                        </div>
                        <div className="col-sm">
                        {
                                MUIText({
                                    typography : "Team B",
                                    dataOnChange : handleTeamTwo,
                                    id: "outlined-basic",
                                    label: "Enter team B",
                                    type : "text",
                                    stylish : {width: '100%'},
                                    variant : "outlined",
                                    isError : errorRequest.errorHandler.errorLoggerTeamB,
                                    helperTextHelper : errorHelperText,
                                    value : (team.teamObj === undefined) ? defaultValueSetter : team.teamObj.teamB
                                  })
                        }
                        </div>
                    </div>
                </DialogContent>
                    <DialogActions>
                    {
                                MUIButton({
                                    variant : "contained",
                                    buttonName: "Close",
                                    stylish : {marginRight : '5px'},
                                    onhandleClick : handleGameSettingsSave
                                })
                            }
                    </DialogActions>
            </Dialog>
                            <hr/>
       <div style={{marginTop: '20px', marginBottom: '20px'}} className="row">
       <div className="col-sm">
            <Card style={{width: '100%'}}>
                        <CardContent>
                            Game Quarter
                        <center>
                                    <Typography sx={{ fontSize: 100 }} style={{fontWeight : 'bold'}} color="text.secondary" gutterBottom>
                                        {quarter.quarterObj.firstQuarter ? "1ST" : quarter.quarterObj.secondQuarter ? "2ND" : quarter.quarterObj.thirdQuarter ? "3RD" : "4TH"}
                                    </Typography>
                                    </center>  
                                    {
                                        MUIButton({
                                            variant : "contained",
                                            buttonName: (quarter.quarterObj.firstQuarter ? "Set to 2nd" : quarter.quarterObj.secondQuarter ? "Set to 3rd" : quarter.quarterObj.thirdQuarter ? "Set to 4th" : "Set to 1st"),
                                            stylish : {marginRight : '5px'},
                                            onhandleClick : () => handleOnChangeQuarter(quarter.quarterObj)
                                        })
                                    }
                        </CardContent>
                    </Card>
            </div>
            <div className="col-sm">
            <Card style={{width: '100%'}}>
                        <CardContent>
                            Game Time
                        <center>
                                    <Typography sx={{ fontSize: 140 }} style={{fontWeight : 'bold'}} color="text.secondary" >
                                        {dispSecondsAsMins(gameTime)}
                                    </Typography>
                                    </center>  
                                    {
                                MUIButton({
                                    variant : "contained",
                                    buttonName: !gametimeStart ? "Start" : "Stop",
                                    stylish : {marginRight : '5px'},
                                    onhandleClick : handleStartGameTime
                                })
                            }
                        </CardContent>
                    </Card>
            </div>
            <div className="col-sm">
            <Card style={{width: '100%'}}>
                        <CardContent>
                            Shot clock
                        <center>
                                    <Typography sx={{ fontSize: 140 }} style={{fontWeight : 'bold'}} color="text.secondary" >
                                        {ShotClockdispSecondsAsMins(shotTime)}
                                    </Typography>
                                    </center>  
                                    {
                                MUIButton({
                                    variant : "contained",
                                    buttonName: !isShotTime ? "Start" : "Stop",
                                    stylish : {marginRight : '5px'},
                                    onhandleClick : handleStartShotTime
                                })
                            }
                        </CardContent>
                    </Card>
            </div>
        </div>
        <div className="wrapper">
            <div className="row">
                <div className="col-sm">
                    <Card style={{width: '100%', backgroundColor : '#0000FF', color: '#FFFFFF'}}>
                        <CardContent>
                                    <Typography sx={{ fontSize: 50 }}  gutterBottom>
                                        {(team.teamObj === undefined) ? defaultValueSetter : team.teamObj.teamA}
                                    </Typography>
                                    <center>
                                    <Typography sx={{ fontSize: 190 }} style={{fontWeight : 'bold'}}  >
                                        {(score.scoreObj === undefined) ? defaultScoreValueSetter : score.scoreObj.teamAScore}
                                    </Typography>
                                    </center>
                        </CardContent>
                    </Card>
                    <div style={{display: 'inline'}}>
                    {
                                MUIButton({
                                    variant : "contained",
                                    buttonName: "Add 1 point",
                                    stylish : {marginRight : '5px', marginTop: '20px',},
                                    onhandleClick : () => handleScore(1, 'teamA')
                                })
                            }
                            {
                                MUIButton({
                                    variant : "contained",
                                    buttonName: "Add 2 points",
                                    stylish : {marginRight : '5px', marginTop: '20px',},
                                    onhandleClick : () => handleScore(2, 'teamA')
                                })
                            }
                            {
                                MUIButton({
                                    variant : "contained",
                                    buttonName: "Add 3 points",
                                    stylish : {marginRight : '5px', marginTop: '20px',},
                                    onhandleClick : () => handleScore(3, 'teamA')
                                })
                            }
                            {
                                (score.scoreObj === undefined) ? defaultScoreValueSetter 
                                : score.scoreObj.teamAScore === 0 ? <></> : MUIButton({
                                    variant : "contained",
                                    buttonName: "Deduct 1 point",
                                    color : 'error',
                                    stylish : {marginRight : '5px', marginTop: '20px',},
                                    onhandleClick : () => handleDeductScore(1, 'teamA')
                                })
                            }
                    </div>
                </div>
                <div className="col-sm">
                <Card style={{width: '100%', backgroundColor : '#FF0000', color: '#FFFFFF'}}>
                        <CardContent>
                        <Typography sx={{ fontSize: 50 }}  gutterBottom>
                        {(team.teamObj === undefined) ? defaultValueSetter : team.teamObj.teamB}
                                    </Typography>
                                    <center>
                                    <Typography sx={{ fontSize: 190 }} style={{fontWeight : 'bold'}}  >
                                    {(score.scoreObj === undefined) ? defaultScoreValueSetter : score.scoreObj.teamBScore}
                                    </Typography>
                                    </center>
                        </CardContent>
                    </Card>
                    <div style={{display: 'inline'}}>
                    {
                                MUIButton({
                                    variant : "contained",
                                    buttonName: "Add 1 point",
                                    stylish : {marginRight : '5px', marginTop: '20px',},
                                    onhandleClick : () => handleScore(1, 'teamB')
                                })
                            }
                            {
                                MUIButton({
                                    variant : "contained",
                                    buttonName: "Add 2 points",
                                    stylish : {marginRight : '5px', marginTop: '20px',},
                                    onhandleClick : () => handleScore(2, 'teamB')
                                })
                            }
                            {
                                MUIButton({
                                    variant : "contained",
                                    buttonName: "Add 3 points",
                                    stylish : {marginRight : '5px', marginTop: '20px',},
                                    onhandleClick : () => handleScore(3, 'teamB')
                                })
                            }
                            {
                                (score.scoreObj === undefined) ? defaultScoreValueSetter 
                                : score.scoreObj.teamBScore === 0 ? <></> : MUIButton({
                                    variant : "contained",
                                    buttonName: "Deduct 1 point",
                                    color : 'error',
                                    stylish : {marginRight : '5px', marginTop: '20px',},
                                    onhandleClick : () => handleDeductScore(1, 'teamB')
                                })
                            }
                    </div>
                </div>
            </div>
            
        </div>      
        </>
    )
}

export default ScoringBoard