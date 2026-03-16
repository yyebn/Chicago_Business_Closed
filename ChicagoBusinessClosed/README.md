[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/DGX3Ghs2)

Url : https://businessclosedassignment.netlify.app/


Dataset Description:

BusinessClosed dataset in the Chicago Data Portal records closed business licenses. Identifiers and information in this dataset include: license ID, account number, site number, legal and DBA (doing business as) names, business type, description of the license, address, ZIP code, community area, issue and expiration dates, and when the status of the license was updated. Records range from closures in 2006 through the present, and a few entries denote previous effective dates since 2002. The city evolves on a daily basis because it maintains an ongoing licensing program. City planners, community groups, journalists, researchers, and business analysts who want to examine economic resilience and business turnover within Chicago are able to utilize this dataset. Potential applications include examining neighborhood-level effects of occurrences such as the 2008 recession or the COVID-19 pandemic, monitoring how specific types of businesses perform over time within a given area, and geocoding closure trends throughout the city.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
How we constructed the embeddings:

To create our embeddings, we first gathered the BusinessClosed dataset into a table by Ward. For every ward we wrote the total number of businesses closed and also how many closures occurred by license type. We then combined this with a table of total number of active businesses in each ward so that we could compare total closures to size of the local business base. Using these two tables, we built a feature vector for each Ward that included: total closures, percentage of closures by license type; and closure rates (total closures divided by total active businesses). We also filtered out any records without a ward ID or record dates that were clearly incorrect, then calculated and standardized all of the numeric features to have a mean of zero and a standard deviation of one. Finally, we applied Principal Component Analysis (PCA) using Python to generate a two-dimensional representation of the feature matrix and saved both the complete feature matrix and the two-dimensional representations in CSV format.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Dimensionality reduction method and rationale:

Our dimensionality reduction approach was based specifically on PCA (Principal Component Analysis). PCA was a suitable dimensionality reduction method because it is not only well understood but also very simple and quick to implement. PCA creates new axes that are created through linear combinations of the existing features; we can continue talking about the contribution of the Closure Count and Closure Rate variables, along with other components. PCA1 versus PCA2 shows the primary way to plot all variations of Closure Patterns across Wards; we can therefore consider this Create PCA Embedding the Main View for our application.


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Iterations on the embedding design:

A lot of this project was taken from our previous developments on prior assignments. So, I will mention some iterations we have done previously in connection to this assignment. our first iteration used only the raw closure counts by license type. This version made the loop and other busy commercial wards have a huge bias compared to others, so we needed to account for this and balance things out. This was important to account for because obviously, we don't get any interesting insights from looking at this bias; all we see is that the loop has more businesses than other wards. We included the BusinessOpened dataset from the Chicago Data Portal, and ran a calculation to normalize our data and display things correctly. Another part of our iterative process was noise reduction. Of course Chicago is a big city with some unorthodox businesses, and so that can add noise to our data. We grouped rare license types into an "other" category. At that point we were able to derive findings, we noticed a lot of the southern neighborhoods in chicago had slightly higher closure rates than others. We also recognized (though we thought this would be obvious even before our analyzation) that during the Covid19 pandemic, Food service was hit the worst of any other industry. More on this in the findings section of this documentation.



------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Encodings, interactions, and initial findings

The connection between the three visualization views all share Ward as the common link between the three. In the Embed Scatter Plot, the position of each point represents a given Ward based on its two PCA coordinates, with the size and colors of the point representing the number of total closures. So wards that have more closures will be shown in darker colors and larger points. In the bar chart there is one bar for each ward and the height of the bar shows the number of closures. In the Choropleth map the boundaries of every ward are seen across the city and each polygon of the map is coloured by the number of closures or closure rate. All three views are interactive. Clicking on a point in the Embed Scatter Plot highlights the corresponding bar and ward polygon. If a user clicks on a bar in the bar chart then the corresponding ward will be highlighted in the Embed Scatter Plot and the Choropleth map and clicking on a ward in the Choropleth map will highlight the corresponding bar and point in the Embed Scatter Plot. The tooltips that pop up when you hover over the bars provide an indication of the Ward number and PCA coordinates along with the total number of closures per ward.


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Standalone HTML interface organization

It is a single HTML file featuring a simple three-column layout; The embedded scatterplot on the left is used as the primary exploratory view for analyzing data, with the bar graph and choropleth map positioned respectively at the top and bottom of the right column. User interaction with one chart is reflected throughout all three via real-time synchronization; therefore, by first discovering an overall trend in the embedding before then examining the bar graph to make exact comparisons (where applicable) & accessing a visual representation of that same information via the choropleth map in context, users are able to intuitively navigate through their data more effectively.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Figure 1 below shows the main layout of our interface. The scatterplot on the left shows the ward embeddings while the bar chart and the choropleth map on the right show total closures by ward. Together these three give an overview of how business closures are distributed across Chicago.
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<img width="957" height="413" alt="Capture" src="https://github.com/user-attachments/assets/b78f5c2f-a658-41cb-9216-24ea05b17394" />


Figure 1. Ward-level embedding of business closure patterns with linked bar chart and map. Each point in the scatterplot is a ward, and color and size indicate total closures.
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Figure 2 below shows how the linked interactions work in more detail. When a user clicks a bar for a given ward, the matching point in the embedding and the polygon on the map are highlighted. Tooltips will appear with ward identifiers, PCA coordinates, and closure counts which aids the user read exact values while exploring patterns.
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<img width="1269" height="671" alt="image" src="https://github.com/user-attachments/assets/5e09538d-7d45-46c7-b72c-085d7e47dd13" />


Figure 2. Example of linked attribute and spatial views. A selected ward is highlighted across the bar chart, embedding, and map, and tooltips provide detailed information.
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




