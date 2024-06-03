import { glob } from 'glob';

const paths = {
  src: 'src/*.js',
  stylesheets: ['src/*.scss', 'src/**/stylesheets/*.scss', 'src/**/stylesheets/*.css'],
  scripts: ['src/vendor/*.js', 'src/show/javascripts/*.js'],
};

export const getFilePaths = (patterns) => {
  if (!patterns)                                                patterns = [];
  if (patterns.length === 0)                                    patterns = [];
  if (typeof patterns === 'string')                             patterns = [patterns];
  if (typeof patterns === 'object' && !Array.isArray(patterns)) patterns = Object.values(patterns);
  return patterns.reduce((filePaths, pattern) => {
    return filePaths.concat(glob.sync(pattern));
  }, []);
};

export default paths;
/**
 * 1. single path
 * 2. multiple paths
 * 3. path with wildcard
 * 4. path with multiple wildcards
 * 5. empty path
 * 6. no path
 * 7. unsupported files found
 */