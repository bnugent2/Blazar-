import React, { useEffect, useState,useContext } from 'react'
import Avatar from 'react-avatar';
import './schedule.css'
import { ScheduleComponent, ResourcesDirective, ResourceDirective, ExcelExport, Print, ExportOptions, TimelineViews, ViewsDirective, ViewDirective, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { db } from '../firebase';
import { AuthContext } from "../Authentication";
function Schedule(props) {

    const team = props.resources
    const {currentUser} = useContext(AuthContext);
    const [shifts, setShifts] = useState([])

    useEffect(() => {
        db.collection('roster').where("author", "==", currentUser.uid).onSnapshot(snapshot => {
            setShifts(snapshot.docs.map(doc => {
                return {
                    Id: doc.id,
                    Subject: doc.data().Subject,
                    StartTime: doc.data().StartTime,
                    EndTime: doc.data().EndTime,
                    TaskId: doc.data().TaskId
                }
            }))
        })

    }, []);

    const deleteShift = (id) => {
        db.collection('roster').doc(id).delete().then(res => {
            console.log('Deleted!', id);
        });
    }



    const header = (props) => {
        const data = props.resourceData
        return (
            <div className='header'>
                <Avatar className='header' name={data.name} round={true} size='30px' />
                <h4 className='header'> {data.name}</h4>
            </div>
        )
    }


    const addShift = (args) => {
        const start = args.StartTime.toISOString();
        const end = args.EndTime.toISOString();
        db.collection('roster').add({
            Subject: args.Subject,
            StartTime: start,
            EndTime:  end,
            TaskId: args.TaskId,
            author: currentUser.uid
})
    }

    const handleEvent = (args) => {
        switch (args.requestType) {
            case 'eventRemove':
                deleteShift(args.data[0].Id);
                break;
            case 'eventCreate':
                console.log(args)
                addShift(args.data[0])
                break;
        }
    }

    return (
        <div className='col-lg-9 control-section'>
            <div className='control-wrapper'>
                <ScheduleComponent width='99%' height='80vh' actionBegin={(args) => handleEvent(args)} cssClass='schedule-cell-dimension' rowAutoHeight={true} currentView={'TimelineWeek'} timeScale={{ enable: false }} group={{ byDate: true, resources: ['Owners'] }} selectedDate={new Date()} resourceHeaderTemplate={header} eventSettings={{ dataSource: shifts }}>
                    <ResourcesDirective>
                        <ResourceDirective field='TaskId' title='Team Member' name='Owners' allowMultiple={true}
                            dataSource={team} textField='name' idField='id' colorField='color'>
                        </ResourceDirective>
                    </ResourcesDirective>
                    <ViewsDirective>
                        <ViewDirective option='TimelineWeek' />
                        <ViewDirective option='Agenda' agendaDaysCount={'7'} />
                    </ViewsDirective>
                    <Inject services={[Agenda, Resize, DragAndDrop, TimelineViews, ExcelExport, Print]} />
                </ScheduleComponent>
            </div>
        </div>
    )
}

export default Schedule
