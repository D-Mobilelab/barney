# Contribute

## GULP Commands

To execute a GULP task

    gulp <task> <arguments>

<table>
    <tr>
        <th>task</th>
        <th>description of task</th>
        <th>possible arguments</th>
    </tr>
    <tr>
        <td><b>eslint</b></td>
        <td>Run ESLint on source file</td>
        <td></td>
    </tr>
    <tr>
        <td><b>test</b></td>
        <td>Run unit test</td>
        <td><i>--watch</i>: run a local server on coverage report</td>
    </tr>
    <tr>
        <td><b>coveralls</b></td>
        <td>Pass coverage report to coveralls (use it on Travis)</td>
        <td></td>
    </tr>
    <tr>
        <td><b>webpack</b></td>
        <td>Create dist file with webpack</td>
        <td><i>--version</i>: create a specified version of the dist file (i.e. --version=2.0.0)</td>
    </tr>
    <tr>
        <td><b>doc</b></td>
        <td>Create documentation</td>
        <td>
            <i>--version</i>: create a specified version of the documentation (i.e. --version=2.0.0)<br/>
            <i>--watch</i>: run a local server on new documentation<br/>
        </td>
    </tr>
    <tr>
        <td><b>build</b></td>
        <td>Create complete build: run eslint and test, make dist file and documentation</td>
        <td>
            <i>--version</i>: create a specified version (i.e. --version=2.0.0)<br/>
            <i>--watch</i>: run a local server on examples<br/>
        </td>
    </tr>
</table>

## Create a new version

- Run this command (replacing x.y.z with new version name)

        gulp build --version=x.y.z

- Replace version field on package.json
- Add description of new version on CHANGELOG.md file
- Commit and push on master branch
- Create tag with version name with 

        git tag x.y.z && git push origin --tags

- Push documentation with this command 
    
        git subtree push --prefix docs origin gh-pages
    
- Execute this command, to update npm package

        npm publish
