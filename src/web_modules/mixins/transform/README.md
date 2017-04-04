# transform mixin

Allows you to transform data

### Usage

```javascript
import { modelConstructorFactory } from 'utils/model'
import transformMixin from 'mixins/transform'

function formatData(metadata) { ... }

const CoursesCollection = collectionConstructorFactory({
  api: 'InstructorCourses',
  mixins: [
    transformMixin((data) => formatData(data))
  ]
})
```
