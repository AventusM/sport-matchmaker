import React from 'react'
import { Link } from 'react-router-dom'
import { updatePassword } from '../../firebase/auth'
import PasswordForm from './PasswordForm'
import ChallengeStatusChanger from './ChallengeStatusChanger'
import { Paper, Typography } from 'material-ui';

const styles = {
  Paper: { padding: 20, margin: 10, borderRadius: '2px' },
  Link: { color: 'black', textDecoration: 'none' }
}

const Users = ({ users }) => {
  return (
    <div>
      {users.map((user) =>
        <Paper style={styles.Paper} elevation={4} key={user.id}>
          <Typography className="individualUserName" variant="headline">
            {user.username}
          </Typography >
          <Link className="individualUserLink" to={`/users/${user.id}`} style={styles.Link}>
            view profile
          </Link>
        </Paper>)}
    </div>
  )
}

//Challenge - status siirrettävä pois tästä komponentista
//Muuten käyttäjä voi haastaa itseään
const UserInfo = (props) => {
  const { user } = props
  console.log('user id from <UserInfo/> component', user.uid)
  return (
    <Paper style={styles.Paper} elevation={4}>
      <Typography variant="title">
        User settings for {user.username}
      </Typography >
      <p>email: {user.email}</p>
      {user.challengeStatus
        ? <button onClick={() => console.log('challenge!!')}>Challenge</button>
        : <p><b>{user.username}</b>does not accept challenges at this moment</p>}
    </Paper>
  )
}

const User = (props) => {
  const { user, session, editChallengeStatus } = props
  if (user) {
    return (
      <div>
        <UserInfo user={user} />
        {session.authUser.uid === user.uid
          ? <div>
            <ChallengeStatusChanger path={user.id} status={!user.challengeStatus} editChallengeStatus={editChallengeStatus} />
            <PasswordForm />
          </div>
          : null}
      </div>
    )
  } else {
    return (
      <div>
        Loading individual user data...
      </div>
    )
  }
}

export default Users
export { User }