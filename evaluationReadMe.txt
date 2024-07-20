We have provided a python script to run your program on the provided training problems. You are not required to use this, but you might find it helpful in validating your submission. Recall, your program should accept a command line argument containing a path to a problem in the format described in the prompt.

To use the evaluation script, run the following in a shell:

python3 evaluateShared.py --cmd {command to run your program} --problemDir {folder containing training problems}

The script will load every problem in the training problem folder, and run the command on each file. The {command to run your program} should NOT include a file directory (as these will be read from the problemDir folder).

For example, if your solution is a python3 script called "mySubmission.py", and you have downloaded the training problems to a folder called "trainingProblems", then run

python3 evaluateShared.py --cmd "python3 mySubmission.py" --problemDir trainingProblems

(Quotes are needed around "python3 mySubmission.py" because of the space.) If your solution is a compiled executable called "mySubmission", then it would be

python3 evaluateShared.py --cmd ./mySubmission --problemDir trainingProblems

The script will check your program for errors and print your score on each problem.



distance 77.21645082873184 minutes
distance 161.88518097887058 minutes
distance 278.7237321929648 minutes
distance 324.8373537099831 minutes
distance 484.53985755395036 minutes
distance 570.1739624722545 minutes
distance 592.1524156484741 minutes
distance 658.7607030416282 minutes
distance 838.8653139094126 minutes
distance 863.0465354497604 minutes
distance 974.7322730213239 minutes
distance 1039.8021803572035 minutes
distance 1130.033953355691 minutes
distance 1181.2003202153294 minutes
distance 1231.1799509197422 minutes
schedule idx 0 is invalid: driver runs for 1231.1799509197422 minutes
