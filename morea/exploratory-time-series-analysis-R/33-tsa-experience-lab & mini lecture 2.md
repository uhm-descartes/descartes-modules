---
title: "Lab & Mini Lecture 2: Stationarity"
published: true
morea_id: 33-tsa-experience-lab & mini lecture 2
morea_type: experience
morea_summary: "Testing for Stationarity"
morea_sort_order: 3
morea_labels:
  - 2:40pm-3:10pm
---

# What is Exploratory Data Analysis? Why Do We Use It?
 
<img src="Screenshot 2023-12-01 at 2.09.06 AM.png" alt="What is EDA?" width="1000"/>

### 

<img src="Screenshot 2023-12-01 at 2.51.58 AM.png" alt="EDA Guidelines" width="1000"/>

###

# What is Stationarity?

<img src="Screenshot 2023-12-01 at 2.14.01 AM.png" alt="What is Stationarity?" width="1000"/>

###

# Mini Lab #2: Testing for Stationarity

1. Convert global temperature data from monthly to annual to reduce the noise and then plot it.

2. What can you observe from this new plot?

3. Do you hypothesize that this data is stationary or non-stationary?

4. Test for stationarity using two common methods (using the annual global temperature data):  

      <img src="Screenshot 2023-12-01 at 2.21.19 AM.png" alt="STATIONARITY TESTING" width="1000"/>

    * adf.test(annual_data)

    * kpss.test(annual_data)


5. What do the p-values indicate? How confident are we?

6. Now go back in time until the data interval seems stationary. Start with data 1940 and prior and work your way back until you are highly confident in stationarity.

    * adf.test(annual_data[time(annual_data) < \Dec 1940\])

    * kpss.test(annual_data[time(annual_data) < \Dec 1940\])


7. What can you deduce from this stationarity analysis?





{% include next-button.html
top-label="3. Causality in the Data ->"
bottom-label="3:20pm-3:50pm"
url="34-tsa-experience-lab & mini lecture 3" %}
