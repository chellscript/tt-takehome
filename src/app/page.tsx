"use client";

import data from "../../public/eventsData.json";
import { useRef, useState } from "react";
import { Event } from "../../types";
import AvaliableEvents from "@/components/eventsAvaliable";
import SelectedEvents from "@/components/eventsSelected";
import EventIdsList from "@/components/eventIdsList";

export default function Home() {
  const eventIdsRef = useRef<HTMLDivElement>(null);

  const {
    customer: { name, id, email, purchasedEvents },
  } = data;

  const [availableEvents, setAvailableEvents] =
    useState<Event[]>(purchasedEvents);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [showEventIds, setShowEventIds] = useState<Event["id"][]>([]);

  const handleAddEvents = (sortedEvents: {
    filtered: Event[];
    remaining: Event[];
  }) => {
    setAvailableEvents(sortedEvents.remaining);
    setSelectedEvents([...sortedEvents.filtered, ...selectedEvents]);
  };

  const handleRemoveEvents = (sortedEvents: {
    filtered: Event[];
    remaining: Event[];
  }) => {
    setSelectedEvents(sortedEvents.remaining);
    setAvailableEvents([...sortedEvents.filtered, ...availableEvents]);
  };

  const generateEventIds = () => {
    const ids = selectedEvents.map((event) => event.id);

    setShowEventIds(ids);
    eventIdsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="flex size-fit min-h-full min-w-full flex-col items-center justify-center gap-y-4 bg-mainLight p-4 pb-10">
      <div className="website-max-width flex w-11/12 flex-col gap-y-4">
        <div className="text-xl">
          <div>Name: {name}</div>
          <div>Id: {id}</div>
          <div>Email: {email}</div>
        </div>
        <div className="grid grid-flow-col grid-cols-1 flex-col items-baseline justify-center *:h-full md:grid-cols-2 md:gap-x-8">
          <AvaliableEvents
            updateData={handleAddEvents}
            data={availableEvents}
          />
          <SelectedEvents
            updateData={handleRemoveEvents}
            data={selectedEvents}
          />
        </div>{" "}
        <div className="flex justify-end">
          <button
            disabled={selectedEvents.length === 0}
            className="button w-full rounded-md bg-main p-2 text-2xl hover:font-bold lg:w-[calc(50%-16px)]"
            onClick={generateEventIds}
          >
            Generate {selectedEvents.length} Event Id(s)
          </button>
        </div>
        <div id="event-ids" ref={eventIdsRef}>
          {!!showEventIds.length && (
            <EventIdsList showEventIds={showEventIds} />
          )}
        </div>
      </div>
    </div>
  );
}
