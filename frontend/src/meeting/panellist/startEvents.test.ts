import { render, screen, fireEvent } from "@testing-library/react";
import { startEvent, startEventProps } from "./startEvents";

describe("startEvent", () => {
    it("activates event link and redirects to IframeLink", async () => {
        const mockMeetingID = 123;
        const mockIframeLink = "https://example.com/test-event";
        const props: startEventProps = {
            IframeLink: mockIframeLink,
            meetingID: mockMeetingID,
        };

        global.fetch = jest.fn().mockResolvedValue({ ok: true });

        render(startEvent(props));

        const startEventButton = screen.getByRole("button", { name: /Start/i });
        fireEvent.click(startEventButton);

        await screen.findByText(/Starting/i);

        expect(fetch).toHaveBeenCalledWith(
            `http://127.0.0.1:8080/meeting/${mockMeetingID}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            }
        );

        expect(window.location.href).toBe(mockIframeLink);
    });

    it("logs an error if activation request fails", async () => {
        const mockMeetingID = 123;
        const mockIframeLink = "https://example.com/test-event";
        const props: startEventProps = {
            IframeLink: mockIframeLink,
            meetingID: mockMeetingID,
        };

        global.fetch = jest.fn().mockResolvedValue({ ok: false });

        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

        render(startEvent(props));

        const startEventButton = screen.getByRole("button", { name: /Start/i });
        fireEvent.click(startEventButton);

        await screen.findByText(/Starting/i);

        expect(consoleErrorSpy).toHaveBeenCalledWith("Error activating event link.");
    });
});
