import { db } from '../firebase/firebase'

const INITIAL_STATE = []
const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USERS': {
      return action.users
    }
    default:
      return state
  }
}

//Fetch / Set (action)
export const setUsers = (users) => {
  return {
    //Case
    type: 'SET_USERS',
    //Action
    users
  }
}

export const editChallengeStatus = (path, status) => {
  return async (dispatch) => {
    console.log('path', path)
    console.log('status', status)
    const updatedUser = await db.ref(`users/${path}`).update({ challengeStatus: status })

    //Mahdollisesti async/await - testejä varten, jos ristiriidat riippuvuuksien kanssa saadaan selvitettyä
    // return updatedUser
  }
}

export const fetchAndSetFirebaseUsers = () => {
  return async (dispatch) => {
    await db.ref('users').on('value', (snapshot) => {
      const userArray = []
      snapshot.forEach((childSnapshot) => {
        userArray.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      dispatch(setUsers(userArray))
    })
  }
}

export const addFirebaseUser = (content) => {
  return async (dispatch) => {
    const { username, email, uid, challengeStatus } = content
    const newUser = { username, email, uid, challengeStatus }
    const dbUserRef = await db.ref('users').push(newUser)

    //Mahdollisesti async/await - testejä varten, jos ristiriidat riippuvuuksien kanssa saadaan selvitettyä
    return dbUserRef
  }
}

export default usersReducer