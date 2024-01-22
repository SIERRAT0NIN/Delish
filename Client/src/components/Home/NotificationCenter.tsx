import { Button, Card, CardHeader, CardBody } from "@nextui-org/react";

export default function NotificationCenter() {
  return (
    <div className="fixed bottom-0 right-0 m-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <Button auto>Notifications</Button>

      <Card className="shadow-none border-0">
        <CardHeader>
          <h4>Notifications</h4>
          <p>You have 3 unread messages.</p>
        </CardHeader>
        <CardBody>
          <div className="notification-item">
            <h4>Your call has been confirmed.</h4>
            <p>5 min ago</p>
          </div>
          <div className="notification-item">
            <h4>You have a new message!</h4>
            <p>1 min ago</p>
          </div>
          <div className="notification-item">
            <h4>Your subscription is expiring soon!</h4>
            <p>2 hours ago</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
