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

export const addUser = createAsyncThunk(
  "app/addUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(`${Host}/api/auth/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": getToken(),
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        return rejectWithValue(result);
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateUserApproval = createAsyncThunk(
  "app/updateUserApproval",
  async ({ id, status }) => {
    const res = await fetch(`${Host}/api/auth/approval/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
      body: JSON.stringify({ status }),
    });

    return await res.json();
  },
);

export const updateUserStatus = createAsyncThunk(
  "app/updateUserStatus",
  async ({ id, status }) => {
    const res = await fetch(`${Host}/api/auth/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
      body: JSON.stringify({ status }),
    });

    return await res.json();
  },
);

export const updateUser = createAsyncThunk(
  "app/updateUser",
  async ({ id, data }) => {
    const res = await fetch(`${Host}/api/auth/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  },
);

export const deleteUser = createAsyncThunk("app/deleteUser", async (id) => {
  const res = await fetch(`${Host}/api/auth/delete/${id}`, {
    method: "DELETE",
    headers: {
      "auth-token": getToken(),
    },
  });

  return {
    id,
    ...(await res.json()),
  };
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

export const getLandingPage = createAsyncThunk(
  "app/getLandingPage",
  async () => {
    const res = await fetch(`${Host}/api/landing`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
    });
    return res.json();
  },
);
export const getAgentByReferralId = createAsyncThunk(
  "app/getAgentByReferralId",
  async (referralId) => {
    const res = await fetch(`${Host}/api/auth/referral/${referralId}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
    });
    return res.json();
  },
);

export const getTeamTree = createAsyncThunk(
  "app/getTeamTree",
  async (referralId) => {
    const res = await fetch(`${Host}/api/auth/team-tree/${referralId}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
    });

    return res.json();
  },
);
export const getIncome = createAsyncThunk("app/getIncome", async () => {
  const res = await fetch(`${Host}/api/auth/income-history`, {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken(),
    },
  });

  return res.json();
});
export const getIncomeSummary = createAsyncThunk(
  "app/getIncomeSummary",
  async () => {
    const res = await fetch(`${Host}/api/wallet/commission/summary`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
    });

    return res.json();
  },
);

export const getRoyaltyUsers = createAsyncThunk(
  "app/getRoyaltyUsers",
  async () => {
    const res = await fetch(`${Host}/api/rewards/royalty-users`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
    });
    return await res.json();
  },
);
export const getMyRewards = createAsyncThunk(
  "app/getMyRewards",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${Host}/api/rewards/my-rewards`, {
        headers: {
          "auth-token": getToken(),
        },
      });

      return await res.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const claimRewardCash = createAsyncThunk(
  "app/claimRewardCash",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${Host}/api/rewards/claim-cash/${id}`, {
        method: "PUT",
        headers: {
          "auth-token": getToken(),
        },
      });

      return await res.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const claimRewardGift = createAsyncThunk(
  "app/claimRewardGift",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${Host}/api/rewards/claim-reward/${id}`, {
        method: "PUT",
        headers: {
          "auth-token": getToken(),
        },
      });

      return await res.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getRewards = createAsyncThunk("app/getRewards", async () => {
  const res = await fetch(`${Host}/api/rewards`, {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken(),
    },
  });

  return res.json();
});

export const updateReward = createAsyncThunk(
  "app/updateReward",
  async ({ id, data }) => {
    const res = await fetch(`${Host}/api/rewards/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  },
);

export const getOffers = createAsyncThunk("app/getOffers", async () => {
  const res = await fetch(`${Host}/api/offer`, {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken(),
    },
  });

  return res.json();
});

export const addOffer = createAsyncThunk("app/addOffer", async (data) => {
  const res = await fetch(`${Host}/api/offer/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken(),
    },
    body: JSON.stringify(data),
  });

  return await res.json();
});

export const updateOffer = createAsyncThunk(
  "app/updateOffer",
  async ({ id, data }) => {
    console.log(data,"iddata")
    const res = await fetch(`${Host}/api/offer/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  },
);

export const deleteOffer = createAsyncThunk("app/deleteOffer", async (id) => {
  const res = await fetch(`${Host}/api/offer/delete/${id}`, {
    method: "DELETE",
    headers: {
      "auth-token": getToken(),
    },
  });

  return await res.json();
});

export const toggleOfferStatus = createAsyncThunk(
  "app/toggleOffer",
  async (id) => {
    const res = await fetch(`${Host}/api/offer/toggle/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": getToken(),
      },
    });

    return await res.json();
  },
);

export const getDiscount = createAsyncThunk("app/getDiscount", async () => {
  const res = await fetch(`${Host}/api/discount`, {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken(),
    },
  });

  return res.json();
});

export const addDiscount = createAsyncThunk("app/addDiscount", async (data) => {
  const res = await fetch(`${Host}/api/discount/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken(),
    },
    body: JSON.stringify(data),
  });

  return await res.json();
});

export const updateDiscount = createAsyncThunk(
  "app/updateDiscount",
  async ({ id, data }) => {
    const res = await fetch(`${Host}/api/discount/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  },
);

export const deleteDiscount = createAsyncThunk(
  "app/deleteDiscount",
  async (id) => {
    const res = await fetch(`${Host}/api/discount/delete/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": getToken(),
      },
    });

    return await res.json();
  },
);

export const toggleDiscountStatus = createAsyncThunk(
  "app/toggleDiscount",
  async (id) => {
    const res = await fetch(`${Host}/api/discount/toggle/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": getToken(),
      },
    });

    return await res.json();
  },
);
export const getCashback = createAsyncThunk("app/getCashback", async () => {
  const res = await fetch(`${Host}/api/cashback`, {
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken(),
    },
  });

  return res.json();
});

export const addCashback = createAsyncThunk("app/addCashback", async (data) => {
  const res = await fetch(`${Host}/api/cashback/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": getToken(),
    },
    body: JSON.stringify(data),
  });

  return await res.json();
});

export const updateCashback = createAsyncThunk(
  "app/updateCashback",
  async ({ id, data }) => {
    const res = await fetch(`${Host}/api/cashback/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getToken(),
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  },
);

export const deleteCashback = createAsyncThunk(
  "app/deleteCashback",
  async (id) => {
    const res = await fetch(`${Host}/api/cashback/delete/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": getToken(),
      },
    });

    return await res.json();
  },
);

export const toggleCashbackStatus = createAsyncThunk(
  "app/toggleCashback",
  async (id) => {
    const res = await fetch(`${Host}/api/cashback/toggle/${id}`, {
      method: "PUT",
      headers: {
        "auth-token": getToken(),
      },
    });

    return await res.json();
  },
);

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
    myRewards: [],
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

      .addCase(getTeamTree.fulfilled, (state, action) => {
        state.teamTree = action.payload;
      })
      .addCase(getIncome.fulfilled, (state, action) => {
        state.incomeHistory = action.payload;
      })
      .addCase(getIncomeSummary.fulfilled, (state, action) => {
        state.incomeSummary = action.payload;
      })
      .addCase(getRoyaltyUsers.fulfilled, (state, action) => {
        state.royaltyUsers = action.payload;
      })
      .addCase(getMyRewards.fulfilled, (state, action) => {
        state.myRewards = action.payload;
      })
      .addCase(getRewards.fulfilled, (state, action) => {
        state.rewards = action.payload;
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        state.offersData = action.payload;
      })
      .addCase(getDiscount.fulfilled, (state, action) => {
        state.discountsData = action.payload;
      })
      .addCase(getCashback.fulfilled, (state, action) => {
        state.cashbackData = action.payload;
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
