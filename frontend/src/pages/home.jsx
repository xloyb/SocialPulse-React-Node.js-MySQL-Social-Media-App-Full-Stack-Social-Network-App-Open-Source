import Posts from "../components/Posts"
import Share from "../components/Share"
import Stories from "../components/Stories"


const home = () => {
  return (
    <div className="place-items-center">  {/* it had grid  class */}
    
    <Stories />
    <Share/>
    <Posts component={(props) => <Posts userId={props.match.params.userId} />}/>

    </div>
  )
}

export default home