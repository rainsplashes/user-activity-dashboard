package main

import (
    "encoding/json"    //encode data as JSON
    "log"              //simple logging to stdout for debugging
    "net/http"         //HTTP server + routing
)

//RawUser holds only the raw fields we need to send to the client
type RawUser struct {
    Name                string `json:"name"`                  // e.g. "Foo Bar1"
    CreateDate          string `json:"create_date"`           // "YYYY-MM-DD"
    PasswordChangedDate string `json:"password_changed_date"` // "YYYY-MM-DD"
    LastAccessDate      string `json:"last_access_date"`      // "YYYY-MM-DD"
    MFAEnabled          bool   `json:"mfa_enabled"`           // true/false
}

func main() {
    //Associate the usersHandler function with the /api/users url
    http.HandleFunc("/api/users", usersHandler)

    //Start HTTP server on port 8080
    log.Println("Server listening on http://localhost:8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatalf("ListenAndServe failed: %v", err)
    }
}

//usersHandler writes a JSON array of RawUser records.
func usersHandler(w http.ResponseWriter, r *http.Request) {
    //user data is coded into this array
    users := []RawUser{
        {
            Name:                "Foo Bar1",
            CreateDate:          "2020-10-01",
            PasswordChangedDate: "2021-10-01",
            LastAccessDate:      "2025-01-04",
            MFAEnabled:          true,
        },
        {
            Name:                "Foo1 Bar1",
            CreateDate:          "2019-09-20",
            PasswordChangedDate: "2019-09-22",
            LastAccessDate:      "2025-02-08",
            MFAEnabled:          false,
        },
        {
            Name:                "Foo2 Bar2",
            CreateDate:          "2022-02-03",
            PasswordChangedDate: "2022-02-03",
            LastAccessDate:      "2025-04-12",
            MFAEnabled:          false,
        },
        {
            Name:                "Foo3 Bar3",
            CreateDate:          "2023-03-07",
            PasswordChangedDate: "2025-03-10",
            LastAccessDate:      "2022-01-03",
            MFAEnabled:          true,
        },
        {
            Name:                "Foo Bar4",
            CreateDate:          "2018-04-08",
            PasswordChangedDate: "2020-04-12",
            LastAccessDate:      "2022-10-04",
            MFAEnabled:          false,
        },
        {
            Name:                "Foo New",
            CreateDate:          "2025-04-08",
            PasswordChangedDate: "2025-04-12",
            LastAccessDate:      "2025-05-04",
            MFAEnabled:          false,
        },
    }

    //Inform client that json is the return format
    w.Header().Set("Content-Type", "application/json")

    //Encode json from users array to return
    if err := json.NewEncoder(w).Encode(users); err != nil {
        //If something goes wrong, send HTTP 500
        http.Error(w, "Failed to encode users", http.StatusInternalServerError)
    }
}
