import React from "react"
import { Route } from "react-router-dom"
import { AnalyzeForm } from "./Analyze/AnalyzeForm"
import { ItemProvider } from "./itemslists/ListProvider"
import { PurchasedList } from "./itemslists/purchasedlist"
import { ShoppingList } from "./itemslists/shoppinglist"
import { ItemDetail } from "./itemslists/ItemDetail.js"
import { MyProfile } from "./profile/profileform"
import { NoteForm } from "./itemslists/newnoteform"
import { UserProvider } from "./profile/UserProvider"
import { WelcomePage } from "./Welcome/WelcomePage"
import { EditNoteForm } from "./itemslists/editnoteform"


export const ApplicationViews = () => {
    return (
        <>
            <UserProvider>
                <ItemProvider>
                    <Route path="/analyze">
                        <AnalyzeForm />
                    </Route>
                    <Route exact path="/">
                        <WelcomePage />
                    </Route>
                    <Route exact path="/shoppinglist">
                        <ShoppingList />
                    </Route>
                    <Route path="/purchasedlist">
                        <PurchasedList />
                    </Route>
                    <Route path="/myprofile">
                        <MyProfile />
                    </Route>
                    <Route path="/shoppinglist/:itemId(\d+)">
                        <ItemDetail />
                    </Route>
                    <Route path="/newnote/:ItemnoteId(\d+)">
                        <NoteForm />
                    </Route>
                    <Route path="/editnote/:editnoteId(\d+)">
                        <EditNoteForm />
                    </Route>
                </ItemProvider>
            </UserProvider>
        </>
    )
}


