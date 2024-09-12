import { Metadata } from "next";
import EventPageClient from "../../../../components/EventPageClient";
import { supabase } from "../../../../utils/supabase";

// Generate dynamic SEO metadata

export async function generateMetadata({
  params,
}: {
  params: { eventsId: string };
}): Promise<Metadata> {
  // Fetch event data

  const { data: eventData, error }: any = await supabase
    .from("event_details")
    .select("*,event_images(event_id,url)")
    .eq("id", params.eventsId);

  // console.log(eventData);

  if (!eventData) return {};

  const eventTitle = eventData.event_title || "Event";
  const eventDescription =
    eventData.event_description || "Check out this event!";
  const eventImageUrl =
    JSON.parse(eventData[0].event_images[0].url)[0] ||
    "https://jzhgfowuznosxtwzkbkx.supabase.co/storage/v1/object/public/event_image/_Black_And_Yellow_Modern_Event_Producer_Initial_Logo-removebg-preview.png"; // Default image

  // Meta tags for WhatsApp will use OpenGraph tags
  return {
    title: `${eventTitle} | Your Event Platform`,
    description: eventDescription,
    openGraph: {
      title: eventTitle,
      description: eventDescription,
      url: `https://nexmeet-lake.vercel.app/explore-events/${params.eventsId}`,
      images: [
        {
          url: eventImageUrl,
          width: 800,
          height: 600,
        },
      ],
      type: "website", // WhatsApp also recognizes this tag to determine the type of content
    },
    twitter: {
      card: "summary_large_image",
      title: eventTitle,
      description: eventDescription,
      images: [eventImageUrl],
    },
  };
}

// Render the client-side component
export default function EventPage({
  params,
}: {
  params: { eventsId: string };
}) {
  return <EventPageClient eventsId={params.eventsId} />;
}
