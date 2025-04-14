import { AppIntentManager, AppIntentProtocol, Widget, } from "scripting"
import { store } from "./store"

/**
 * Use in a Toggle view of `widget.tsx`.
 * When the toggle was tapped, the perform function will be called and will toggle the read state of that doc.
 */
export const ToggleReadIntent = AppIntentManager.register({
  name: "ToggleReadIntent",
  protocol: AppIntentProtocol.AppIntent,
  perform: async (title: string) => {
    store.toggleRead(title)
  }
})

/**
 * Use in a Button view of `widget.tsx`.
 * When the button was tapped, the perform function will be called and refresh the doc list and reload the widget.
 */
export const RefreshDocsIntent = AppIntentManager.register({
  name: "RefreshDocsIntent",
  protocol: AppIntentProtocol.AppIntent,
  perform: async () => {
    store.saveRandomDocsToRead()
    Widget.reloadAll()
  }
})