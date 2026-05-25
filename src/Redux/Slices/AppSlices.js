import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Host from "../../Host/Host";

// Helper
const getToken = () => localStorage.getItem("token");

// ========================
// 🔥 Async Thunks
// ========================

export const getAccountDetails = createAsyncThunk(
  "app/getAccountDetails",
  async () => {
    const res = await fetch(`${Host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
    });
    return res.json();
  },
);

export const getUserRole = createAsyncThunk("app/getUserRole", async (role) => {
  const res = await fetch(`${Host}/api/auth/role/${role}`, {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken(),
    },
  });
  return res.json();
});

export const getUser = createAsyncThunk("app/getUser", async () => {
  const res = await fetch(`${Host}/api/auth/all-users`, {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken(),
    },
  });
  return res.json();
});

export const getLeads = createAsyncThunk("app/getLeads", async () => {
  const res = await fetch(`${Host}/api/lead`, {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken(),
    },
  });
  return res.json();
});

export const getSiteVisit = createAsyncThunk("app/getSiteVisit", async () => {
  const res = await fetch(`${Host}/api/sitevisit`, {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken(),
    },
  });
  return res.json();
});

export const getBooking = createAsyncThunk("app/getBooking", async () => {
  const res = await fetch(`${Host}/api/booking`, {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken(),
    },
  });
  return res.json();
});

export const getPayments = createAsyncThunk("app/getPayments", async () => {
  const res = await fetch(`${Host}/api/payment`, {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken(),
    },
  });
  return res.json();
});

export const getLocation = createAsyncThunk("app/getLocation", async () => {
  const res = await fetch(`${Host}/api/location`, {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken(),
    },
  });
  return res.json();
});

export const getAllColonies = createAsyncThunk(
  "app/getAllColonies",
  async (locationId) => {
    const res = await fetch(`${Host}/api/colony`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
    });
    return res.json();
  },
);
export const getProjects = createAsyncThunk(
  "app/getProjects",
  async (locationId) => {
    const res = await fetch(`${Host}/api/colony/location/${locationId}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
    });
    return res.json();
  },
);

export const getPlots = createAsyncThunk("app/getPlots", async (locationId) => {
  const res = await fetch(`${Host}/api/plot/${locationId}`, {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken(),
    },
  });
  return res.json();
});

export const getLandingPage = createAsyncThunk("app/getLandingPage", async () => {
  const res = await fetch(`${Host}/api/landing`, {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken(),
    },
  });
  return res.json();
});
export const getAgentByReferralId = createAsyncThunk("app/getAgentByReferralId", async (referralId) => {
  const res = await fetch(`${Host}/api/auth/referral/${referralId}`, {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken(),
    },
  });
  return res.json();
});


// ========================
// 🔥 Slice
// ========================

const appSlice = createSlice({
  name: "app",
  initialState: {
    userDetail: null,
    usersRole: [],
    users: [],
    leads: [],
    siteVisit: [],
    booking: [],
    payment: [],
    location: null,
    allColonies: [],
    projects: [],
    plots: [],
    getLandingPage: [],
    agentByReferralId: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // USER
      .addCase(getAccountDetails.fulfilled, (state, action) => {
        state.userDetail = action.payload;
      })
      
      // All USER by role
      .addCase(getUserRole.fulfilled, (state, action) => {
        state.usersRole = action.payload;
      })

      // All USER
      .addCase(getUser.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      // LEADS
      .addCase(getLeads.fulfilled, (state, action) => {
        state.leads = action.payload;
      })

    //   SITE VISIT
      .addCase(getSiteVisit.fulfilled, (state, action) => {
        state.siteVisit = action.payload;
      })

    //   BOOKING
      .addCase(getBooking.fulfilled, (state, action) => {
        state.booking = action.payload;
      })

    //   PAYMENTS
      .addCase(getPayments.fulfilled, (state, action) => {
        state.payment = action.payload;
      })

      // LOCATION
      .addCase(getLocation.fulfilled, (state, action) => {
        state.location = action.payload;
      })

      // PROJECTS ALL Colonies
      .addCase(getAllColonies.fulfilled, (state, action) => {
        state.allColonies = action.payload;
      })

      // PROJECTS
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
      })

      // PLOTS
      .addCase(getPlots.fulfilled, (state, action) => {
        state.plots = action.payload;
      })
      // getLandingPage
      .addCase(getLandingPage.fulfilled, (state, action) => {
        state.landingPage = action.payload;
      })
      
      .addCase(getAgentByReferralId.fulfilled, (state, action) => {
        state.agentByReferralId = action.payload;
      })

      // LOADING (optional global)
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        },
      );
  },
});

export default appSlice.reducer;
