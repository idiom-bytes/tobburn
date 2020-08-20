import ReactGA from "react-ga"
import {secrets} from "./Secrets";

export const initGA = () => {
  ReactGA.initialize(secrets.MEASUREMENT_ID)
}

export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
}

export const logDonationClick = () => {
    ReactGA.event({
      category: 'Page',
      action: 'Donation Click'
    });
}