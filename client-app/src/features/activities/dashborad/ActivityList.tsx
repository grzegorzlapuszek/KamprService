import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  setEditMode: (editMode: boolean) => void;
  deleteActivity: (id: string) => void;
}

export const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  setEditMode,
  deleteActivity
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>Date</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => {
                    selectActivity(activity.id);
                    setEditMode(false);
                  }}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={() => {
                    deleteActivity(activity.id);
                    //setEditMode(false);
                  }}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content="Category" />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
        ;
      </Item.Group>
    </Segment>
  );
};