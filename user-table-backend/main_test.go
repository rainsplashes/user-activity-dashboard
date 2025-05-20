package main

import (
    "encoding/json"
    "net/http"
    "net/http/httptest"
    "testing"
)

func TestUsersHandler(t *testing.T) {
    //Prepare a request to the /api/users handler
    req := httptest.NewRequest("GET", "/api/users", nil)
    w := httptest.NewRecorder()

    //Calls the handler
    usersHandler(w, req)

    //Verify 200 status code
    resp := w.Result()
    if resp.StatusCode != http.StatusOK {
        t.Fatalf("expected status 200, got %d", resp.StatusCode)
    }

    //Decode JSON Response if data is successfully returned
    var users []map[string]interface{}
    if err := json.NewDecoder(resp.Body).Decode(&users); err != nil {
        t.Fatalf("error decoding JSON: %v", err)
    }

    //Expect at least one user for this test
    if len(users) == 0 {
        t.Fatal("expected at least one user in JSON response")
    }

    //Check all elements of a user is present
    sample := users[0]
    for _, key := range []string{"name", "create_date", "password_changed_date", "last_access_date", "mfa_enabled"} {
        if _, ok := sample[key]; !ok {
            t.Errorf("missing key %q in user object", key)
        }
    }
}