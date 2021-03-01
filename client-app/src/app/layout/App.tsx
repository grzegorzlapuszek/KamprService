import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { IActivity } from "../../models/activity";
import { NavBar } from "../../features/NavBar";
import { ActivityDashboard } from "../../features/activities/dashborad/ActivityDashboard";
import agent from "../api/agent";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const openCreateFormHandler = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity : IActivity) =>{
    agent.Activities.create(activity).then( () => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    })
    //add new activity at the end of the array
  } //spread operator: take existing array and spread them across a new array 

  const handleUpdateActivity = (activity : IActivity) =>{
    agent.Activities.update(activity).then( () => {
      setActivities([...activities.filter(a=>a.id !== activity.id), activity]) 
      setSelectedActivity(activity);
      setEditMode(false);
    })
  }

  const handleDeleteActivity = (id: string) => {
    agent.Activities.delete(id).then( () => {
      setActivities([...activities.filter(a => a.id !== id)])
    })
  }

  useEffect(() => {
    agent.Activities.list()
      .then((response) =>{
      //let activities = ConvertDateFormatFromResponse(response);
      let activities : IActivity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      })
      setActivities(activities)
    })
    }, []); //add second parameter as an empty array prevents from re-rendering on every refresh

  return (
    <Fragment>
      <NavBar openCreateForm={openCreateFormHandler} />
      <Container
        style={{
          marginTop: "7em",
        }}
      >
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleUpdateActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
