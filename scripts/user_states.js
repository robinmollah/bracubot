function getUserState(){
    // TODO get user state from firestore
}

function setUserState(state){
    // TODO check if valid state
    // TODO update user_state to firestore
}

module.exports.states = {
    "default" : 0,
    "submitting" : [
        { "default" : 100},
        { "course_code" : 101},
        { "course_name" : 102},
        {"note_link" : 103},
        {"submitted": 120}
    ],
    "profile" : [
        {"default" : 200},
        {"student_id" : 201}
    ]
};