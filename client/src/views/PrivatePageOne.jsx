import {connect} from 'react-redux'

const PrivatePageOne = (props) => {

    return (
        <div>
            <h1>Private Page One</h1>
            <img src={`http://localhost:8000/image/${props.profileImage}`} alt="profile pic"/>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        profileImage: state.auth.userInfo.profileImage
    }
}

export default connect(mapStateToProps, null)(PrivatePageOne)