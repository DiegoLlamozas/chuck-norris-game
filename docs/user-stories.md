# User Stories for Chuck Norris Jokes Test Application

## Overview
This document contains the user stories for the Chuck Norris Jokes Test application where users can test their knowledge by filling in missing words in Chuck Norris jokes.

## US-001: Start a New Joke Test

**Description:** As a user, I want to start a new joke test so that I can test my Chuck Norris knowledge.

### Acceptance Criteria

#### Scenario 1: Starting a new test successfully
Given the user is on the home page  
When the user clicks the "Create Test" button  
Then the system creates a test with 10 random Chuck Norris jokes and navigates to the test page

#### Scenario 2: Network error during test creation
Given the user requests a new test  
When the Chuck Norris API is unavailable  
Then the system displays an error message and does not navigate to the test page

## US-002: View Test Question

**Description:** As a user, I want to view a joke with redacted words so that I can guess the missing words.

### Acceptance Criteria

#### Scenario 1: Displaying a question
Given the test has started  
When a question is loaded  
Then the system displays the joke with up to 3 words replaced by blanks ("___")

#### Scenario 2: No questions available
Given the test has no questions  
When the test page loads  
Then the system navigates back to the home page

## US-003: Submit Answer to Question

**Description:** As a user, I want to submit my answers for a question so that I can see how many I got correct.

### Acceptance Criteria

#### Scenario 1: Submitting all answers
Given the user has filled in all blanks  
When the user submits the answers  
Then the system shows both the user's answers and correct answers, and calculates the score

#### Scenario 2: Submitting incomplete answers
Given the user hasn't filled all blanks  
When the user submits the answers  
Then the system rejects the submission and prompts to fill all blanks

## US-004: Navigate Through Test Questions

**Description:** As a user, I want to move to the next question after submitting answers so that I can complete the test.

### Acceptance Criteria

#### Scenario 1: Moving to next question
Given the user has submitted answers for the current question  
When the user clicks "Next Question"  
Then the system loads the next question and clears previous answers

#### Scenario 2: Last question completed
Given the user has submitted answers for the last question  
When the user clicks "Next Question"  
Then the system displays the final score and test completion message

## US-005: View Final Test Results

**Description:** As a user, I want to see my final score after completing the test so that I can evaluate my performance.

### Acceptance Criteria

#### Scenario 1: Displaying final score
Given the user has completed all questions  
When the test finishes  
Then the system shows the total score, percentage, and appropriate feedback based on performance

#### Scenario 2: Perfect score achievement
Given the user got all answers correct  
When the test finishes  
Then the system displays a perfect score message with Chuck Norris celebration GIF

## US-006: Restart Test

**Description:** As a user, I want to start a new test after completing one so that I can try again or play more.

### Acceptance Criteria

#### Scenario 1: Starting over from results
Given the test is completed  
When the user clicks "Start Again"  
Then the system resets all test data and navigates to the home page

## US-007: View Home Page

**Description:** As a user, I want to view the home page so that I can start a new test.

### Acceptance Criteria

#### Scenario 1: Loading home page
Given the user navigates to the home view  
When the system loads  
Then the system displays the Chuck Norris test welcome message and "Create Test" button