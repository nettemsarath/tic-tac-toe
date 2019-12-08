
import React,{ Component } from 'react'

class Sarath extends Component{
    constructor(){
        super();
        this.state = {
            Array :[ ['','',''],
                     ['','',''],
                     ['','','']] ,
           // next_player:true ,
            match : { won:null, success:false} ,
            matched:false
        }


    }
    player_next =()=>{
        console.log('Handling Player next...')
        let newarray = this.state.Array ;
        let p= true ;
        while(p){
            let i = Math.floor(Math.random() * 3) ;
            let j= Math.floor(Math.random() * 3) ;
            if(newarray[i][j]===''){
                newarray[i][j]='O'
                this.setState({
                    Array: newarray
                })
                p=false
                console.log('New Array is :', newarray)
            }
        }
        this.didhewon()
    }
    didhewon = async()=>{
        console.log('Handling Did he won...')
        let NLR = this.state.Array 
        let i,j ;
        for( i=0;i<3;i++){
	    j=0;
		if((NLR[i][j]===NLR[i][j+1]) && (NLR[i][j]===NLR[i][j+2])){
            //console.log("hiii 1111")
            let match = { won:NLR[i][j] , success:true} ;
            console.log(match)
           await this.setState({
                match:match
            })
           
		}
		if((NLR[j][i]===NLR[j+1][i]) && (NLR[j][i]===NLR[j+2][i])){
            //console.log("hiii 222")
            let match = { won:NLR[j][i] , success:true}
            
           await this.setState({
                match:match
            })
            console.log(this.state.match)
			
		}
		if( (NLR[j][j]===NLR[j+1][j+1]) && ((NLR[j][j]===NLR[j+2][j+2])) ){
            //console.log("diagonal")
            let match = { won:NLR[j][j], success:true}
            
           await this.setState({
                match:match
            })
           console.log(this.state.match)
			
		}
	//console.log(i,j)
        }
        if( (NLR[2][0]===NLR[1][1]) &&(NLR[2][0]===NLR[0][2]) ){
        let match = { won:NLR[2][0], success:true}
        
       await this.setState({
            match:match
        })

        }
        return 1 ;

    }

    handleChange = async (i,j)=>{
        console.log('Handling Change..')
        if( this.state.match.won===null || this.state.match.won==='' ){
            console.log("hiiiiiii")
            console.log(i,j);
            let newarray = [...this.state.Array ];
            newarray[i][j]='X'
            await this.setState({
                Array:newarray
            }) 
            console.log( this.state.Array )
           await this.didhewon() ;
           this.player_next() ;

        }
    }
    render(){
        let display = this.state.Array.map((data,i)=>{
            return <tr key={i}>{ data.map((obj,j)=>{
                return <td width='70' height='70' key={j} onClick={()=> this.handleChange(i,j)}>{obj}</td>
            }) }</tr>
        })
        let winning;
        if( (this.state.match.won!=='') && ( this.state.match.success===true) ){
             winning = <p>{this.state.match.won} Won the Match</p>
        }
        return(
           <div>
                <table border='1'>
                    <tbody>
                        {display}
                    </tbody>
                </table>
                <div>
                    {winning}
                </div>
           </div> 
        )
    }
}


export default Sarath