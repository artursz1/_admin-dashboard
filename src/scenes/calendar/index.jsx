import { useContext, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { ManagerContext, UserContext } from "../../App";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const { loggedInUsername } = useContext(UserContext);
  const { isManager } = useContext(ManagerContext);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    console.log("isManager: ", isManager);
    if (isManager === "1") {
      if (title) {
        calendarApi.addEvent({
          id: `${selected.dateStr}-${title}`,
          title,
          start: selected.startStr,
          end: selected.endStr,
          allDay: selected.allDay,
        });
      } else {
        alert("Title can't be empty!");
      }
    } else {
      alert("Only managers can add or remove calendar events.");
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      if (isManager === "0") {
        alert("Only managers can add or remove calendar events.");
      } else {
        selected.event.remove();
      }
    }
  };

  return (
    <Box m="20px 200px 0 20px">
      <Header title="Calendar" subtitle="Events | Meetings | ETC" />

      <Box display="flex" justifyContent="space-between">
        {loggedInUsername !== "Guest" ? (
          <>
            {/* CALENDAR SIDEBAR */}
            <Box
              flex="1 1 20%"
              backgroundColor={colors.primary[400]}
              p="15px"
              sx={{
                backgroundColor: "#737578",
                borderRadius: "10px",
                opacity: "90%",
              }}
            >
              <Typography variant="h5">Events</Typography>
              <List>
                {currentEvents.map((event) => (
                  <ListItem
                    key={event.id}
                    sx={{
                      backgroundColor: "#",
                      margin: "10px 0",
                      borderRadius: "2px",
                      opacity: "90%",
                    }}
                  >
                    <ListItemText
                      primary={event.title}
                      secondary={
                        <Typography>
                          {formatDate(event.start, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* CALENDAR */}
            <Box flex="1 1 100%" ml="25px">
              <FullCalendar
                height="75vh"
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={handleDateClick}
                eventClick={handleEventClick}
                eventsSet={(events) => setCurrentEvents(events)}
                initialEvents={[]}
              />
            </Box>
          </>
        ) : (
          <p>
            <strong>
              <span style={{ color: "#b67f9e" }}>Note: </span>
            </strong>
            Informations about Events | Meetings | ETC are confidential. You can
            have access to these by
            <strong>
              <span style={{ color: "#b67f9e" }}> joining the clan</span>
            </strong>
            .
          </p>
        )}
      </Box>
    </Box>
  );
};

export default Calendar;
